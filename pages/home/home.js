// pages/home/home.js
import { Theme } from '../../model/theme'
import { Banner } from '../../model/banner'
import { WaterFlow } from '../../model/waterFlow'
import { Category } from '../../model/category'
import { Actvity } from '../../model/actvity'
import { Tag } from '../../model/tag'

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
    skuLatest: null
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
    const skuLatest = await WaterFlow.getSkuLatest()
    const items_arr = this.processData_SkuLatest(skuLatest.items)
    // 提取出获取数据的 init方法避免多次setData
    //.slice(0,2)

    // console.log(tag_alter)
    this.setData({
      themeA: themeA,
      bannerB: bannerB,
      gridC: gridC,
      activityD: activityD,
      scollersE: scollersE,
      themeF:themeF,
      bannerG:bannerG,
      themeH: themeH,
      arr: selling_arr,
      items: items_arr,
      skuLatest: skuLatest,
    })
    if (this.data.items !== []) {
      wx.lin.renderWaterFlow(this.data.items, false, () => {
        // console.log('渲染成功')
      })
    }

  },

  processData_SkuLatest (items=[]) {
    let item_arr = []
    for (let i = 0, length = items.length; i < length; i++) {
      let item = {
        id: items[i].id,
        image: items[i].img,
        title: items[i].title,
        describe: items[i].subtitle,
        count: items[i].price,
        delCount: items[i].discount_price,
        tags:items[i].tags
      }
      item_arr.push(item)

    }
    return item_arr
  },
  onReachBottom (event) {
    console.log('test')
  }

})