// pages/test/test.js
Page({

  data: {
    imgUrl: "/image/2.jpg",
    title_disabled: true, //控制修改表头名字
    management_good: true,
    select_all: false,
    middlearr: [],
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
  },
  // 改变类目的名字
  // change_classname: function() {
  //   let that = this;
  //   that.setData({
  //     title_disabled: !that.data.title_disabled,
  //   });
  //   //  这里自动获取焦点
  // },
  // finish_classname: function() {
  //   let that = this;
  //   that.setData({
  //     title_disabled: !that.data.title_disabled,
  //   })
  // },
  // 管理商品
  // management: function() {
  //   let that = this;
  //   that.setData({
  //     management_good: true,
  //   })
  // },
  // finish_management: function() {
  //   let that = this;
  //   that.setData({
  //     management_good: false,
  //   })
  // },
  // 选择方法
  select: function(e) {
    var that = this;
    let arr2 = [];
    if (that.data.management_good === false) {
      return
    } else {
      var arr = that.data.items;
      //获取id取反
      var index = e.currentTarget.dataset.id;
      //
      arr[index].checked = !arr[index].checked;
      console.log(arr);
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
          arr2.push(arr[i])
        }
      };
      that.setData({
        items: arr,
        middlearr: arr2
      })
    }
  },
  // 删除
  deleteitem: function() {
    var that = this;
    let arr = that.data.items;
    let arr2 = [];
    // 删除的数组
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].checked == false) {
        arr2.push(arr[i]);
      }
    }
    that.setData({
      items: arr2,
      middlearr: []
    })
  },
  // 全选
  select_all: function() {
    let that = this;
    that.setData({
      select_all: !that.data.select_all
    })
    if (that.data.select_all) {
      let arr = that.data.items;
      let arr2 = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked == true) {
          arr2.push(arr[i]);
        } else {
          arr[i].checked = true;
          arr2.push(arr[i]);
        }
      }
      that.setData({
        items: arr2,
        middlearr: arr2
      })
    }
  },
  // 取消全选
  select_none: function() {
    let that = this;
    that.setData({
      select_all: !that.data.select_all
    })
    let arr = that.data.items;
    let arr2 = [];
    for (let i = 0; i < arr.length; i++) {
      arr[i].checked = false;
      arr2.push(arr[i]);
    }
    that.setData({
      items: arr2,
      middlearr: []
    })
  }
})