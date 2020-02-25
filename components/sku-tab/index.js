// components/sku-tab/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sku_specification:Array,
    sku_data:Object
  },
  observers: {
    'sku_data': function(newVal, oldVal) {
      // 在 items[] 被赋值改变时候 执行这个函数
      // console.log(newVal)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },
  attached () {
    // console.log(this.properties.sku_data)
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
