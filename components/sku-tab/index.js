// components/sku-tab/index.js
import boolean from '../../miniprogram_npm/lin-ui/common/async-validator/validator/boolean'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sku: Object,
    x: Number,
    priceInterval: Object,
    isSelectFull: Boolean,
    defalutImg: String,
    defalutTitle: String,
    defaultStock:Number,
    changeTitle: String,
    hasNoneSku: Boolean
  },
  observers: {
    'sku,isSelectFull,changeTitle,hasNoneSku,priceInterval': function (sku, isSelectFull, changeTitle, hasNoneSku, priceInterval) {
      // console.log(hasNoneSku)
      this.setTitleCSS()
      if (sku) {
        this.setData({
          _sku: sku
        })
      }
      /**
       * 设置价格区间
       */
      if (priceInterval) {
        if (priceInterval.min < priceInterval.max) {

          const interval = `${priceInterval.min}-${priceInterval.max}`
          this.setData({ interval: interval })
        } else {
          if (priceInterval.min === priceInterval.max) {
            const interval = `${priceInterval.min}`
            this.setData({ interval: interval })
          }
        }
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    _sku: null
  },
  attached () {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    setTitleCSS () {
      if (this.properties.hasNoneSku) {
        this.setData({
          dynamic: 'noSku'
        })
      } else {
        this.setData({
          dynamic: 'hasSku'
        })
      }
    }
  }
})
