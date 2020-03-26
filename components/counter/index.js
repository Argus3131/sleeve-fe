// components/counter/index.js
import { Counter } from '../../models/counter'

Component({

  externalClasses: ["l-place"],
  properties: {
    _count:{
      type: Number,
      value: Counter.cartMinNum
    },
    min: {
      type: Number,
      value: Counter.cartMinNum
    },
    max: {
      type: Number,
      value: Counter.cartMaxNum
    },
    isShow: {
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onOverRange (event) {
      console.log(event.detail.type)
      const minOrMaxOut = event.detail.type
      if (minOrMaxOut === 'overflow_min') {
        wx.showToast({
          title: `亲 最少需要购买${Counter.cartMinNum}件噢~`,
          icon: 'none',
          duration: 2000
        })
      }
      if (minOrMaxOut === 'overflow_max') {
        wx.showToast({
          title: `亲 超出最大购买数量啦~`,
          icon: 'none',
          duration: 2000
        })
      }
    },
    onTapCount (event) {
      console.log(event.detail.count)
      this.triggerEvent('count',{count:event.detail.count},{})
    }
  }
})
