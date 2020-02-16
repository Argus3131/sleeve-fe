// pages/home/home.js
import {
  Theme
} from '../../model/theme'
import {
  Banner
} from '../../model/banner'
import {
  WaterFlow
} from '../../model/waterFlow'
import {
  Category
} from '../../model/category'
import {
  Actvity
} from '../../model/actvity'
import {
  Tag
} from '../../model/tag'
import { promisic } from '../../miniprogram_npm/lin-ui/utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toptheme: [],
    bannerB: null,
    grid: [],
    activity: null,
    items: [],
    skuLatest: null,
    start_num: 0,
    loading: false,
    requestStatus_skuLate: true,
    loading_text: '努力加载中...',
    loading_show: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad (options) {
    this.initAllData()

  },

  async initAllData () {
    // resolve 的参数作为 await 表达式的运算结果。 ThemeModel.getLocationA_theme()返回的是一个Promise对象
    const themes = await Theme.getThemes()
    // console.log(themes)
    // todo   写sku spu小结 写瀑布流优化
    const themeA = themes['locationA']
    const bannerB = await Banner.getLocationB()
    const gridC = await Category.getLocationC()
    const activityD = await Actvity.getLocationD()
    const scollersE = await Theme.getLocationE('t-2')
    const themeF = themes['locationF']
    const bannerG = await Banner.getLocationG()
    const selling_arr = bannerG.items
    const themeH = themes['locationH']
    //----------------skuList------------------
    const skuLatest_res = await WaterFlow.getSkuLatest()
    console.log(skuLatest_res)
    const skuLatest = skuLatest_res['data']
    const items_arr = this.processData_SkuLatest(skuLatest.items)
    // console.log(items_arr)
    // 提取出获取数据的 init方法避免多次setData
    //.slice(0,2)

    // console.log(bannerB.items)
    this.setData({
      themeA: themeA,
      bannerB: bannerB,
      gridC: gridC,
      activityD: activityD,
      scollersE: scollersE,
      themeF: themeF,
      bannerG: bannerG,
      themeH: themeH,
      arr: selling_arr,
      items: items_arr,
      skuLatest: skuLatest,
    })
    this.init_waterFlow()

  },
  init_waterFlow () {
    if (this.data.items !== []) {
      wx.lin.renderWaterFlow(this.data.items, false, () => {
        // console.log('渲染成功')
      })
    }
  },
  processData_SkuLatest (items) {
    let item_arr = []
    for (let i = 0, length = items.length; i < length; i++) {
      let item = {
        id: items[i].id,
        image: items[i].img,
        title: items[i].title,
        describe: items[i].subtitle,
        count: items[i].price,
        delCount: items[i].discount_price,
        tags: items[i].tags
      }
      item_arr.push(item)

    }
    return item_arr
  },

  async onTapping(event){
    console.log(event.detail.id)
    const id = event.detail.id
    await promisic(wx.navigateTo)({
      url: `/pages/product/product?id=${id}`
    })
  },
  async onReachBottom (event) {
    let start_num
    // 判断当前请求情况
    if (this.data.requestStatus_skuLate) {
      start_num = this.data.start_num += 5
    } else {
      start_num = this.data.start_num
    }
    // 加锁 防止多次重复触底发送请求 等待一个请求完成后 渲染完成后再次允许发送请求
    if (this._isloading()) {
      // loading 为true 时 return
      return
    }
    this._locked() // 加锁 防止同一时间节点 重复发送请求
    this.setData({
      start_num: start_num,

    })
    const skuLatest_res = await WaterFlow.getSkuLatest(start_num).catch((reason) => {
      if (reason.errMsg) {
        this.setData({
          requestStatus_skuLate: false
        })
        this._unlocked()
      }
    })
    if (skuLatest_res.statusCode === 200) {
      this.setData({
        // true代表请求成功的
        requestStatus_skuLate: true
      })
    }
    // #注：获取完整的response 需要statusCode和错误信息
    const skuLatest = skuLatest_res['data']
    let _items_new = skuLatest.items
    //判断当前的sku_arr是否为空数组
    // 1）特殊场景断网 传递是[] 导致死锁 的处理 这边使用对状态和 断网情况错误信息判断对锁的状态同步进行改变
    const flag = this._hasMore(_items_new)
    // items_new数组是否为空
    if (flag) {
      this._unlocked()
      const items_new = this.processData_SkuLatest(_items_new)
      // 旧数组拼接原来新数组 保证渲染内容是顺次递增的
      const items_arr = this.data.items.concat(items_new)
      console.log(items_arr)
      this.setData({
        items: items_arr,
        skuLatest: skuLatest,
      })
      this.init_waterFlow()
    } else {
      if (this.data.requestStatus_skuLate) {
        this.setData({
          loading_text: '已经到底啦~',
        })
        setTimeout(() => {
          this.setData({
            loading_show: false
          })
        }, 500)
      }
      // 加锁 禁止继续发送请求
      this._locked()
    }
  },

  _hasMore (arr_skuLatest) {
    return arr_skuLatest.length !== 0

  },
  // 是否在加载中 true
  _isloading () {
    return this.data.loading === true
  },

  _locked () {
    this.setData({
      loading: true
    })
  },

  _unlocked () {
    this.setData({
      loading: false
    })
  }

})