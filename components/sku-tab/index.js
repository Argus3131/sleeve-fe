// components/sku-tab/index.js
import boolean from '../../miniprogram_npm/lin-ui/common/async-validator/validator/boolean'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sku: Object,
    selectedTitle: String,
    specNames: Array,
    x: Number,
    priceInterval: Object,
    isSelectFull: Boolean,
    defalutImg:String,
    defalutTitle:String
  },
  observers: {
    'sku,isSelectFull,selectedTitle,specNames,priceInterval': function (sku,isSelectFull, selectedTitle, specNames, priceInterval) {

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
      /**
       * 设置未选规格状态的提示 颜色，图案，尺码
       */
      let specNameStr
      if (specNames.length > 0) {
        specNameStr = specNames.join('，')
      }
      console.log(isSelectFull)
      const selecting = selectedTitle.length > 0
      this.setData({ selecting: selecting })
      // 正在选sku
      if (selecting) {
        if (selectedTitle) {
          console.log(selectedTitle)
          this.setData({
            _selectedTitle: selectedTitle
          })
        }
      } else {
        if (specNameStr) {
          this.setData({
            _selectedTitle: specNameStr
          })
        }

      }

    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    _sku: null,
    _selectedTitle: null
  },
  attached () {

  },
  /**
   * 组件的方法列表
   */
  methods: {}
})
