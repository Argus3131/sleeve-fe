// pages/cart/cart.js
import { getWindowHeightRpx } from '../../utils/system'

Page({
  data: {
    checkedAll: false,
    count: null,
    cart: [],
    items: [{
      name: '1',
      checked: false,
      img: '/image/2.JPG',
      price: 699,
      dis_price: 500,
      title: '林间有风 自营针织衫 限时售卖 高级品质',
      sku: '黑色；圆领款；M码',
    },
      {
        name: '2',
        checked: false,
        img: '/image/2.JPG',
        price: 699,
        dis_price: 500,
        title: '林间有风 自营针织衫 限时售卖 高级品质',
        sku: '黑色；圆领款；M码',
      },
      {
        name: '3',
        checked: false,
        img: '/image/2.JPG',
        price: 699,
        dis_price: 500,
        title: '林间有风 自营针织衫 限时售卖 高级品质',
        sku: '黑色；圆领款；M码',
      },
      {
        name: '4',
        checked: false,
        img: '/image/2.JPG',
        price: 699,
        dis_price: 500,
        title: '林间有风 自营针织衫 限时售卖 高级品质',
        sku: '黑色；圆领款；M码',
      },
      {
        name: '5',
        checked: false,
        img: '/image/2.JPG',
        price: 699,
        dis_price: 500,
        title: '林间有风 自营针织衫 限时售卖 高级品质',
        sku: '黑色；圆领款；M码',
      },
      {
        name: '6',
        checked: false,
        img: '/image/2.JPG',
        price: 699,
        dis_price: 500,
        title: '林间有风 自营针织衫 限时售卖 高级品质',
        sku: '黑色；圆领款；M码',
      },
    ],
    batchIds: '', //选中的ids
  },

  // 对于缓存或mysql存储的购物车数据的校验 实时
  onLoad: async function (options) {
    const h = await this.setDynamicSegmentHeight()
    this.setData({
      h: h
    })
  },
  /**
   * 单选SPU
   * @param event
   */
  onSelectOne (event) {
    const res = event.detail
    this.selectOrCancelOne(res)
  },
  /**
   * 取消单个SPU
   * @param event
   */
  onCancelOne (event) {
    const res = event.detail
    this.selectOrCancelOne(res)
  },
  /**
   * 单选或取消某个
   * @param res
   */
  selectOrCancelOne (res) {
    if (undefined === res || null === res) {return}
    if (undefined === res.index || null === res.index) {return}
    if (undefined === res.current_item || null === res.current_item) {return}
    const _items = this.data.items
    _items[res.index] = res.current_item
    this.setData({
      items: _items,
    })
    this.isSelectFull()
  },
  // todo 假如load 购物车页面 一定要调用一次方法去判断
  isSelectFull () {

    const items = this.data.items
    const arr = items.filter(item => {return item.checked === true})
    if (arr.length === items.length) {
      this.setData({
        checkedAll: true,
        cart: arr
      })
    } else {
      this.setData({
        checkedAll: false,
        cart: arr
      })
    }
    console.log(this.data.cart)
  },
  /**
   * 全选
   * @param event
   */
  selectAll (event) {
    const items = this.data.items
    const _items = items.map(i => {
      i.checked = true
      return i
    })
    this.setData({
      items: _items,
      checkedAll: true
    })
  },
  /**
   * 取消全选
   * @param event
   */
  cancelAll (event) {
    const items = this.data.items
    const _items = items.map(i => {
      i.checked = false
      return i
    })
    this.setData({
      items: _items,
      checkedAll: false
    })
  },
  async setDynamicSegmentHeight () {
    const windowHeight = await getWindowHeightRpx()
    const h = windowHeight - 88
    return h
  }
})