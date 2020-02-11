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
import { Category } from '../../model/category'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    banner: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad (options) {
    this.initAllData()

  },

  async initAllData () {
    // resolve 的参数作为 await 表达式的运算结果。 ThemeModel.getLocationA_theme()返回的是一个Promise对象
    const themeA = await Theme.getLocationA()
    const bannerB = await Banner.getLocationB()
    const categoryC = await Category.getLocationC()
    const skuLatest = await WaterFlow.getSkuLatest()
    const items_arr = this.processData(skuLatest.items)
    console.log(categoryC)
    // 提取出获取数据的 init方法避免多次setData
    this.setData({
      toptheme: themeA,
      bannerB: bannerB,
      skuLatest: skuLatest,
      items: items_arr,
      categoryC: categoryC
    })
    if (this.data.items !== []) {
      wx.lin.renderWaterFlow(this.data.items, false, () => {
        console.log('渲染成功')
      })
    }

  },
  processData (items) {
    let item_arr = []
    // console.log(items)
    for (let j = 0, length = items.length; j < length; j++) {
      // console.log(j)
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