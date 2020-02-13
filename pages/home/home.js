// pages/home/home.js
import { Theme } from '../../model/theme'
import { Banner } from '../../model/banner'
import { WaterFlow } from '../../model/waterFlow'
import { Category } from '../../model/category'
import { Actvity } from '../../model/actvity'

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
    const grid = await Category.getLocationC()
    const activity = await Actvity.getLocationD()
    const scollers = await Theme.getScollers('t-2')
    const skuLatest = await WaterFlow.getSkuLatest()
    const items_arr = this.processData_SkuLatest(skuLatest.items)
    // 提取出获取数据的 init方法避免多次setData
    console.log(scollers)
    this.setData({
      themeA: themeA,
      bannerB: bannerB,
      grid: grid,
      activity: activity,
      scollers:scollers,
      items: items_arr,
      skuLatest: skuLatest,
    })
    if (this.data.items !== []) {
      wx.lin.renderWaterFlow(this.data.items, false, () => {
        // console.log('渲染成功')
      })
    }

  },
  /**
   *   处理sku商品数据转换
   */
  processData_SkuLatest (items) {
    let item_arr = []
    for (let j = 0, length = items.length; j < length; j++) {
      let item = {
        image: items[j].img,
        title: items[j].title,
        describe: items[j].subtitle,
        count: items[j].price,
        delCount: items[j].discount_price,
      }
      item_arr.push(item)

    }
    return item_arr
  },
  onReachBottom (event) {
    console.log('test')
  }

})