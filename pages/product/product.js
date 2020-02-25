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
  data: {},

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
    // console.log(sku_data)
    const sku_detail_alter = this.processData_skuDetail(sku_data)
    // const sku_specification = this.processData_skuSpecification(sku_data.sku_list)
    // console.log(sku_specification)
    this.setData({
      sku_detail: sku_detail_alter,
      sku_data: sku_data,
      // sku_specification: sku_specification,
    })
  },

  /**
   * 处理sku商品规格动态挑选的功能
   * @param sku
   *       <!-- ["key_id": {"value_id","value_id","value_id"}] -->
   *       <!-- 2:[ {key_id:1,
   *                 values_id:[45,42,44]}
   *                {key_id:3,
   *                 values_id:[9,10,11]}
   *                {4:[14,15,16]}]-->
   *
   */
  processData_skuSpecification (sku) {
    let sku_list = []
    for (let element of sku) {
      const specs = element['specs']
      if (!specs) {
        return
      }
      for (let item of specs) {
        let spec = {}
        const values_id = []
        // 获取item的 key_id
        const key_id = item['key_id']
        // 将获取到的 value_id 加到 spec_arr的数组
        const value = item['value_id']
        values_id.push(value)
        // 判断之前的是否存在对应的记录的对象
        let element = this.isExistItem(sku_list, key_id)
        // console.log(element)
        if (!element) {
          //未找到遍历id 对应大矩阵 映射key_id得到的arr[] 那么直接新建一个映射关系
          spec = { key_id: key_id, values_id: values_id }
          sku_list.push(spec)
        } else {
          let mapping_arr = element['values_id']
          if (mapping_arr) {
            // 遍历得对应的arr就直接加到找到的数组里面
            // {values_id:[45]} => {values_id:[45,42]} 去重判断 isRepeat
            // console.log(mapping_arr)
            const flag = this.isRepeat(mapping_arr, value)
            if (!flag) {
              mapping_arr.push(item['value_id'])
              //更新数组 因为直接通过遍历得到的对象更新的数组 所以没有重复添加对象
              element['values_id'] = mapping_arr
            }
          }
        }
      }
    }
    return sku_list
  },
  isRepeat (list, element) {
    if (list.indexOf(element) === -1) {return false}
    return true
  },
  /**
   *
   * @param list
   * @param id
   * @returns {null|*}
   */
  isExistItem (list, id) {
    for (let element of list) {
      if (element['key_id'] === id) {
        // 返回遍历得到的已存在数组
        return element
      }
    }
    return null
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
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})