// components/salesExplain/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text:Array
  },
  observers:{
    "text":function (text) {
      let _text = []
      if (text){
        for(let element of text) {
          _text.push(element.text)
        }
        this.setData({
          _text:_text
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    _text:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
