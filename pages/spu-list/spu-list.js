// pages/spu-list/spu-list.js
import { WaterFlow } from '../../models/waterFlow'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log(options)
    const url = `/v1/search?q=${options.kwd}`
    console.log(url)
    //----------------spuList------------------
    // const waterFlow = WaterFlow.getInstance(url)
    // const data = await waterFlow.getMoreData()
    // waterFlow.init_waterFlow(data)
  },

  // 初始化瀑布流
  // init_waterFlow (arr) {
  //   if (arr.length > 0) {
  //     wx.lin.renderWaterFlow(arr, false, () => {
  //       console.log('渲染成功')
  //     })
  //   }
  // }
})