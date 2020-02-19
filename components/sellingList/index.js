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
    // 一定要使用监听器 监听数组是否已经存在了否则空数组会报错
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
      let condition = 0
      // 如果是偶数
      if (length > 0 && length % 2 === 0) {
         // 2 4 6 偶数对半分
        condition = length / 2
        this.processLeftAndRightArr(length, arr, condition)
      } else {
        // 1 3 5 7 奇数 左边比右边少1个 即 整除下来得到的商 (不是%) 5/2 = 2..1
        condition = (length - 1) / 2
        this.processLeftAndRightArr(length, arr, condition)
      }
    },
    // 处理Arr 将传递的arr 分割成2个左、右数组
    processLeftAndRightArr(length, arr, condition) {
      // 数组截取
      const left = arr.slice(0, condition)
      const right = arr.slice(condition, length)
      // 将父组件传递 赋值得到的子图宽高进行处理 需要考虑数组内部元素个数arr.length进行均分  / right.length  / left.length 宽不用除 竖向排列
      const rightWidth = this.properties.rightWidth
      const rightHeight = this.properties.rightHeight / right.length
      const leftWidth = this.properties.leftWidth
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
    onSelling(event) {
      console.log(event)
    }
  }
})