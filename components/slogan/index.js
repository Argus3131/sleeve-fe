// components/slogan/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    slogan:String
  },
  observers: {
    "slogan":function(newVal, oldVal) {
      if (newVal.length >0) {
        console.log(newVal.indexOf("$") !== -1)
        if(newVal.indexOf("$") !== -1) {
          const _slogan = newVal.split("$")
          console.log(_slogan)
          this.setData({
            _slogan
          })
        }else {
          const _slogan = [];
          _slogan.push(newVal)
          this.setData({
            _slogan
          })
        }

      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    _slogan:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
