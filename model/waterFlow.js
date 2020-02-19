import { HTTP } from '../utils/http'
import boolean from '../miniprogram_npm/lin-ui/common/async-validator/validator/boolean'

/**
 * @author: Argus
 * @description WaterFlow封装获取最热商品sku的业务模型类
 * @date 2020/2/11 23:31
 */
class WaterFlow {
  static requestStatus = true
  // 这边loading 的状态是指网络正常情况下 是否正在请求
  static loading = false
  static start_num = 0
  static spu_arr = []

  static async getSkuLatest (start_num = 0, count_num = 5) {
    return await HTTP._request({
      url: '/v1/spu/latest',
      data: {
        start: start_num,
        count: count_num
      }
    })
  }

  async getFirstWaterFlow () {
    const skuLatest_res = await WaterFlow.getSkuLatest()
    // console.log(skuLatest_res)
    const skuLatest = skuLatest_res['data']
    const items_arr = WaterFlow.processData_SkuLatest(skuLatest.items)
    WaterFlow.spu_arr = items_arr
    return WaterFlow.spu_arr
  }

  async getMoreWaterFlow (items) {
    let start_num
    // 判断当前请求情况 假如是正常的状态 每次就 增5
    if (WaterFlow.requestStatus) {
      start_num = WaterFlow.start_num += 5
    } else {
      // 否则让客户端发送重复的请求
      start_num = WaterFlow.start_num
    }
    // 加锁 防止多次重复发送请求 等待一个请求完成后 再次允许发送请求
    if (WaterFlow._isLoading()) {
      // loading 为true 时 return 配合加锁防止重复请求
      return
    }
    WaterFlow._locked() // 加数据锁 防止同一时间节点 重复发送请求
    // 因为promise的reject 报错 是不往外抛的 我们用catch去获取错误信息
    const skuLatest_res = await WaterFlow.getSkuLatest(start_num).catch((reason) => {
      if (reason.errMsg) {
        // 请求失败 更改请求状态
        WaterFlow.requestStatus = false
        // 解锁 中途网络切断 会卡死在这行代码 后果：
        // 会造成死锁 因为程序卡在了这个异常地方不走下去了就会一直处于locked
        // 解决方案：在错误状态下的catch代码块里是能执行的 在里面去开锁即可
        console.log('test open lock')
        WaterFlow._unlocked()
      }
    })
    if (skuLatest_res.statusCode === 200) {
      WaterFlow.requestStatus = true
      // #注：获取完整的response 需要statusCode和错误信息
      const skuLatest = skuLatest_res['data']
      let _items_new = skuLatest.items
      //判断当前的sku_arr是否为空数组
      // 1）特殊场景断网 传递是[] 导致死锁 的处理 这边使用对状态和 断网情况错误信息判断对锁的状态同步进行改变
      const flag = WaterFlow._hasMore(_items_new)
      // items_new数组是否为空来判断是否发送了一次完整的http请求
      // 是在网络良好 成功发送请求 响应能获取数组 这个逻辑下进行的 所以上面需要对网络异常的情况进行处理
      if (flag) {
        WaterFlow._unlocked()
        const items_new = WaterFlow.processData_SkuLatest(_items_new)
        // 传入的旧数组拼接原来新数组 保证渲染内容是顺次递增的
        // var a = items.concat(items_new)
        // console.log(a)
        // 这边使用了ES6的新语法 arrOld.push(...arrNew) 优点不会生成一个新对象
        items.push(...items_new)
        return items
      } else {
        if (WaterFlow.requestStatus) {
          // 加锁 禁止继续发送请求
          WaterFlow._locked()
          return false
        }

      }
    }
  }

  // 是否还有更多数据
  static _hasMore (arr_skuLatest) {
    return arr_skuLatest.length !== 0

  }

  // 是否在加载中 true
  static _isLoading () {
    return WaterFlow.loading === true
  }

  // 加锁
  static _locked () {
    WaterFlow.loading = true
  }

  // 解锁
  static _unlocked () {
    WaterFlow.loading = false
  }

  // 数据处理
  static processData_SkuLatest (items) {
    let item_arr = []
    for (let i = 0, length = items.length; i < length; i++) {
      let item = {
        id: items[i].id,
        image: items[i].img,
        title: items[i].title,
        describe: items[i].subtitle,
        count: items[i].price,
        delCount: items[i].discount_price,
        tags: items[i].tags
      }
      item_arr.push(item)

    }
    return item_arr
  }

  // 初始化瀑布流
  init_waterFlow (items) {
    if (items.length > 0) {
      console.log(items)
      wx.lin.renderWaterFlow(items, false, () => {
        console.log('渲染成功')
      })
    }
  }
}

export { WaterFlow }