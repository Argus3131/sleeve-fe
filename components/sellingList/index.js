// components/sellingList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selling: Object,
    items: Array,
    rightWidth: {
      type: Number
    },
    rightHeight: {
      type: Number
    },
    leftWidth: {
      type: Number
    },
    leftHeight: {
      type: Number
    }

  },
  observers: {
    'items': function(newVal, oldVal) {
      // 在 items[] 被赋值改变时候 执行这个函数 
      const length = newVal.length
      if (length > 0) {
        this.controlLayOut(length, newVal)
        this.setData({
          length
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    condition: 0,
    length: 0,
    right: [],
    left: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    controlLayOut(length, arr) {
      const condition = 0
      if (length > 0 && length % 2 === 0) {
        const condition = length / 2
        this.processLeftAndRightArr(length, arr, condition)
      } else {
        const condition = (length - 1) / 2
        this.processLeftAndRightArr(length, arr, condition)
      }
    },
    // 处理Arr 将传递的arr 分割成2个左右数组
    processLeftAndRightArr(length, arr, condition) {
      const right = arr.slice(condition, length)
      const left = arr.slice(0, condition)
      const rightWidth = this.properties.rightWidth / right.length
      const rightHeight = this.properties.rightHeight / right.length
      const leftWidth = this.properties.leftWidth / left.length
      const leftHeight = this.properties.leftHeight / left.length
      this.setData({
        right,
        rightWidth,
        rightHeight,
        left,
        leftWidth,
        leftHeight
      })
    },
    //处理点击事件的函数
    onSelling(event) {

    }
  }
})