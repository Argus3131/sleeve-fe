// components/scoll-area/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scollers:Array,
    scroller_img:String,
    price:Number

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
    onTap(event){
      console.log(event)
    },
    onTapItem(event){
      console.log(event)
    }
  }
})
