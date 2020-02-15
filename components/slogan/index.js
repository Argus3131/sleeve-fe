// components/slogan/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    slogan:String
  },
  observers: {
    // 监视函数 监视是否存在&的需要转换成数组 否则就改成单个字符串数组
    "slogan":function(newVal, oldVal) {
  
      if (newVal.length >0) {
        if(newVal.indexOf("$") !== -1) {
          const _slogan = newVal.split("$")
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
