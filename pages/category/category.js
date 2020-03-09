// pages/category/category.js
import { Category } from '../../models/category'
import { getWindowHeightRpx } from '../../utils/system'
import { Categories } from '../../models/categories'
import { SpuListType } from '../../components/code/enum'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultRootId: 2,
    category: null,
    main: null,
    flag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.initCategories()

  },

  async initCategories () {
    const category = new Categories()
    this.data.category = category
    await category.getCategoryAll()
    const roots = category.getRoots()
    const currentSubs = category.getSubs(this.data.defaultRootId)
    this.getDefaultRootId(roots)
    const bannerImg = roots[this.data.defaultRootId].img
    const h = await this.setDynamicSegmentHeight()
    console.log(currentSubs)
    this.setData({
      h: h,
      roots: roots,
      categories: currentSubs,
      bannerImg: bannerImg
    })
  },

  getDefaultRootId (roots) {
    const defaultId = this.data.defaultRootId
    const ele = roots.find(r => r.id === defaultId)
    if (ele === undefined) {
      this.setData({
        defaultRootId: roots[0].id
      })
    }
  },

  async setDynamicSegmentHeight () {
    const windowHeight = await getWindowHeightRpx()
    const h = windowHeight - 100 - 2
    return h
  },
  changeTabs (event) {
    const idx = event.detail.currentIndex
    const root = this.data.roots[idx]
    const currentSubs = this.data.category.getSubs(root.id)
    const bannerImg = this.data.roots[this.data.defaultRootId].img
    this.setData({
      categories: currentSubs,
      bannerImg: bannerImg
    })
  },
  //todo跳转至
  onJumpToSpuList (event) {
    const cid = event.detail.key
    wx.navigateTo({
      url: `/pages/spu-list/spu-list?cid=${cid}&type=${SpuListType.SUB_CATEGORY}`
    })
  },
  onGotoSearch(event) {
    wx.navigateTo({
      url: `/pages/search/search`
    })

    // console.log(event)
  },

})