// components/cart-tab/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    onGoToHome(event){},
    onGoToCart(event){},
    onAddToCart(event){
      console.log("触发了cart")
      this.triggerEvent("cartTap",{
        type:"cart"
      },{})
    },

    onBuy(event){
      console.log("触发了buyTap")
      this.triggerEvent("buyTap",{
        type:"buy"
      },{})
    }
  }
})
