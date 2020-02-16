// pages/product/product.js
import { isDataEqualsNullAndUndefined } from '../../utils/common'
import { Spu } from '../../model/spu'

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad (options) {
    const id = options.id
    const flag = isDataEqualsNullAndUndefined(id)
    // console.log(flag)
    if (flag) {return }
    const sku = await Spu.getSpu(id)

    const sku_detail = this.processData_skuDetail(sku)
    console.log(sku_detail)
    this.setData({
      sku_detail: sku_detail
    })
  },

  processData_skuDetail(sku) {
    const sku_detail = {
      id:sku.id,
      img:this.processData_skuImgs(sku.spu_img_list),
      title:sku.title,
      describe: sku.subtitle,
      count: sku.price,
      delCount: sku.discount_price,
      tags: sku.tags
    }
    return sku_detail
  },

  processData_skuImgs(spu_img_list) {
    if (spu_img_list) {
      return spu_img_list.reverse()
    }
    return []
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})