// pages/search/search.js
import { Search } from '../../models/search'
import { SpuListType } from '../../components/code/enum'
import { WaterFlow } from '../../models/waterFlow'
import { isStrEqualsNullOrBlank } from '../../utils/common'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searching: false,
    tips: '暂无相关商品',
    _show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const search = Search.getInstance()
    const hot = await search.getTags()

    const history = search.getHistory()
    if (history.length === 0) {
      this.setData({
        hot: hot,
        history: null,
        _show: false
      })
    } else {
      this.setData({
        hot: hot,
        history: history,
        _show: true
      })
    }

  },

  async confirm (event) {
    const kwd = event.detail.value
    this.search(kwd)
  },
  async search (kwd) {
    console.log(isStrEqualsNullOrBlank(kwd))
    if (isStrEqualsNullOrBlank(kwd)) return
    const search = Search.getInstance()
    search.setHistory(kwd)
    const result = await search.getSearchResult(kwd)
    console.log(result)
    const result_a = result.items
    this.setData({
      searching: true,
      searchValue:kwd
    })
    if (result_a.length > 0) {
      // const history = search.getHistory()       history: history,
      this.setData({
        _result: true
      })
      this.init_waterFlow(result_a)
    } else {
      this.setData({
        _result: false
      })
    }
  },
  clearHistory (event) {
    const search = Search.getInstance()
    search.removeHistory()
    const history = search.getHistory()
    this.setData({
      history: history,
      _show: false
    })
  },

  // 初始化瀑布流
  init_waterFlow (arr) {
    if (arr.length > 0) {
      wx.lin.renderWaterFlow(arr, true, () => {
        console.log('渲染成功')
      })
    }
  },
  onCancel (event) {
    const search = Search.getInstance()
    const history = search.getHistory()
    if (history.length === 0) {
      this.setData({
        searching: false,
        history: null,
        _show: false
      })
    } else {
      this.setData({
        searching: false,
        history: history,
        _show: true
      })
    }
    // this.setData({
    //   searching: false,
    //   history: history
    // })
  },
  onTapping (event) {
    console.log(event.detail.id)
    const pid = event.detail.id
    wx.navigateTo({
      url: `/pages/product/product?pid=${pid}`
    })
  },
  tapHistory (event) {
    console.log(event)
    const kwd = event.detail.name
    this.search(kwd)
  },
  tapHot (event) {
    console.log(event)
    const kwd = event.detail.name
    console.log(kwd)
    this.search(kwd)
  },
})