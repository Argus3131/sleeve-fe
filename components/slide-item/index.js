// components/slide-item/index.js
Component({
  options: {
    multipleSlots: true  //启用slot插槽
  },
  /**
   *  组件的属性列表
   */
  properties: {
    item:Object
  },
  observers: {
    'item': function (item) {
      // console.log(item)
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
