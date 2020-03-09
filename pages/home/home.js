// pages/home/home.js
import {
  Theme
} from '../../models/theme'
import {
  Banner
} from '../../models/banner'
import {
  WaterFlow
} from '../../models/waterFlow'
import {
  Category
} from '../../models/category'
import {
  Activity
} from '../../models/activity'
import {
  Tag
} from '../../models/tag'
import {
  promisic
} from '../../miniprogram_npm/lin-ui/utils/util'
import { Spu } from '../../models/spu'

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
    const theme = new Theme()
    // 初始化数据填充themes [] 让对象去保存数据、状态
    await theme.getThemes()
    const themeA = theme.getLocationA()
    const bannerB = await Banner.getLocationB()
    const gridC = await Category.getLocationC()
    const activityD = await Activity.getLocationD()
    // 我们将硬编码的数据't-2' 放在类内部处理掉 await Theme.getLocationESpu('t-2')
    // 由于scollersE对应的是每日上新 因此我们可以加个判断是否上下架子
    let scollersE = null
    let scollE_spu_List
    if (themeA.online) {
      scollersE = await Theme.getLocationESpu()
      if (scollersE) {
        scollE_spu_List = scollersE['spu_list'].slice(0, 7) //截取长度为8
      }
    }
    console.log(scollE_spu_List)
    const themeF = theme.getLocationF()
    const bannerG = await Banner.getLocationG()
    const selling_arr = bannerG.items //截取长度为2 测试sellinglist分布 效果.slice(0,2)
    const themeH = theme.getLocationH()
    //----------------spuList------------------
    const waterFlow = WaterFlow.getInstance('/v1/spu/latest')
    const spu_Latest = await waterFlow.getMoreData()
    console.log(spu_Latest)
    // const test = await Spu.getSpuLatest()
    // console.log(test)

    waterFlow.init_waterFlow(spu_Latest)
    // 提取出获取数据的 init方法避免多次setData
    this.setData({
      loading: true,
      themeA: themeA,
      bannerB: bannerB,
      gridC: gridC,
      activityD: activityD,
      scollersE: scollersE,
      scollE_spu_List: scollE_spu_List,
      themeF: themeF,
      bannerG: bannerG,
      themeH: themeH,
      arr: selling_arr,
      // spu_Latest: spu_Latest,
    })

  },

  onTapping (event) {
    console.log(event.detail.id)
    const pid = event.detail.id
    wx.navigateTo({
      url: `/pages/product/product?pid=${pid}`
    })
  },

  // 让 onReachBottom 只是专注于页面数据的获取 而不是实现里面的逻辑 让类去封装
  async onReachBottom (event) {
    this.setData({
      loading_show: true
    })
    const waterFlow = WaterFlow.getInstance('/v1/spu/latest')
    waterFlow.start = waterFlow.start + waterFlow.count
    const spu_Latest = await waterFlow.getMoreData()
    if (spu_Latest) {
      console.log(spu_Latest)
      waterFlow.init_waterFlow(spu_Latest)
    } else {
      this.setData({
        loading: false,
        end_text: '已经到底啦~',
      })
      setTimeout(() => {
        this.setData({
          loading_show: false
        })
      }, 500)
    }

  },

  onTapThemeH (event) {
    console.log(event)
  }
})