// pages/product/product.js
import {
  isDataEqualsNullAndUndefined
} from '../../utils/common'
import {
  Spu
} from '../../models/spu'
import { SalesExplain } from '../../models/salesExplain'
import { getSystemSize, getWindowHeightRpx } from '../../utils/system'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad (options) {
    const pid = options.pid
    const flag = isDataEqualsNullAndUndefined(pid)
    const salesExplain = await SalesExplain.getSalesExplain()

    // 判空
    if (flag) {
      return
    }
    const sku_data = await Spu.getSpu(pid)

    const sku_detail_alter = this.processData_skuDetail(sku_data)
    const windowHeight = await getWindowHeightRpx()
    const h = windowHeight -100
    this.setData({
      sku_detail: sku_detail_alter,
      sku_data: sku_data,
      salesExplain:salesExplain,
      h: h
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
      tags: sku.tags,
    }
    return sku_detail
  },

  processData_skuImgs (spu_img_list) {
    if (spu_img_list) {
      return spu_img_list.reverse()
    }
    return []
  },

  onTapping (event) {
    const type_button = event.detail.type
    console.log(type_button)
    this.setData({
      show: true,
      type_button: type_button
    })
  },
  onClose (event) {
    const flag = event.detail.show
    this.setData({ show: flag })
  },
  onOpenRealm (event) {
    this.setData({
      show: true,
      type_button: 'cart'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: this.data.sku_detail.title + '，您值得拥有~',
      imageUrl: this.data.sku_detail.img[0]['img']
    }
  }, onSpecChange (event) {
    const specChange = event.detail
    this.setData({
      hasNoneSku: specChange.hasNoneSku,
      changeTitle: specChange.changeTitle,
      isSelectFull: specChange.isSelectFull
    })
  },

})
