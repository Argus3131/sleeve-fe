// components/slide/index.js
Component({
  options: {
    multipleSlots: true  //启用slot插槽
  },
  /**
   * 组件的属性列表
   */
  properties: {
    item:Object,
    idx:Number
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
    select(event) {
      
      let index = this.data.idx
      let _item = this.data.item
      _item.checked = !this.data.item.checked
      this.setData({
        item: _item
      })
      if (this.data.item.checked) {
        this.triggerEvent('selectOne', {index:index,current_item:_item},{})
      }else {
        this.triggerEvent('cancelOne', {index:index,current_item:_item},{})
      }
    }
  }
})
