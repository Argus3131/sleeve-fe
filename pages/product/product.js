// pages/product/product.js
import {
  isDataEqualsNullAndUndefined
} from '../../utils/common'
import {
  Spu
} from '../../models/spu'
import { promisic } from '../../miniprogram_npm/lin-ui/utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad (options) {
    const pid = options.pid
    const flag = isDataEqualsNullAndUndefined(pid)
    // 判空
    if (flag) {
      return
    }
    const sku_data = await Spu.getSpu(pid)
    const sku_detail_alter = this.processData_skuDetail(sku_data)
    console.log(sku_data)
    this.setData({
      sku_detail: sku_detail_alter,
      sku_data: sku_data,

    })
  },




  processData_skuDetail (sku) {
    const sku_detail = {
      id: sku.id,
      img: this.processData_skuImgs(sku.spu_img_list),
      title: sku.title,
      describe: sku.subtitle,
      count: sku.price,
      delCount: sku.discount_price,
      tags: sku.tags
    }
    return sku_detail
  },

  processData_skuImgs (spu_img_list) {
    if (spu_img_list) {
      return spu_img_list.reverse()
    }
    return []
  },
  out (event) {
    console.log(event)
  },

  onTapping (event) {
    console.log(event)
    this.setData({show:true})
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})