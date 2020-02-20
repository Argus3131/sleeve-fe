import { HTTP } from '../utils/http'

/**
 * @author: Argus
 * @description 瀑布流 模型类封装了 获取瀑布流数据的方法
 * @date 2020/2/20 10:31
 */
class WaterFlow {
  static requestStatus = true
  url
  count = 5
  start = 0
  temp = null
  locker = false
  data = null

  // instance

  constructor (url, count = 5, start = 0) {
    this.url = url
    this.count = count
    this.start = start
    this.instance = null
  }

  static getInstance (url, count = 5, start = 0) {
    if (!this.instance) {
      this.instance = new WaterFlow(url, count, start)
    }
    return this.instance
  }

  async getSpuLatest (url, count, start) {
    return await HTTP._request({
      url: url,
      data: {
        start: start,
        count: count
      }
    })
  }

  async getMoreData () {
    const spuLatest = await this.getMoreLatest()
    if (spuLatest === undefined) return
    const arr = spuLatest.items
    if (!this.data) {
      if (arr) {
        this.data = arr
      }
    }else {
      // 这边使用了ES6的新语法 arrOld.push(...arrNew) 优点不会生成一个新对象
      this.data.push(...arr)
    }
    return this.data
  }

  async getMoreLatest () {
    if (this.locker) {
      return
    }
    // 判断锁状态 加锁
    this._setLocker()
    //waterFlow.start = waterFlow.start + this.count
    const request_start = WaterFlow.requestStatus ? this.start : this.temp
    const res = await this.getSpuLatest(this.url, this.count, request_start).catch(
      (result) => {
        if (result.errMsg) {
          console.log('-----connect--test----')
          this._isConnectFailing(false) // 获取外部传入的第一次GG时候的值
          this.start = this.temp //内部将GG值给this.start 因为外边调用者使用的累加了开始值
        }
      }
    )
    if (res.statusCode === 200 && res.data['items'].length > 0) {
      // 细节这边如何判断是在请求失败的之后的第一次请求成功
      // 同上,因为外边调用者的累加 因为成功了就没走.catch分支 意味着我+this.count了一次 所以也要清掉一次
      if (!WaterFlow.requestStatus) {
        this.start = this.temp
      }
      this._releaseLocker()
      WaterFlow.requestStatus = true
      // 清空临时变量
      this._clearTemp()
      return res.data
    }
  }

  // 判断是否网络中断 保证重复发送
  _isConnectFailing (res) {
    if (res === false) {
      // 中断解锁
      WaterFlow.requestStatus = false
      this._releaseLocker()
      // 当temp值不为空时
      if (!this.temp) {
        // 15
        this.temp = this.start
      }
    }
  }

  // 初始化瀑布流
  init_waterFlow (arr) {
    if (arr.length > 0) {
      wx.lin.renderWaterFlow(arr, false, () => {
        console.log('渲染成功')
      })
    }
  }

  _clearTemp () {
    this.temp = null
  }

  /**
   * 获取锁 状态
   * @private
   */
  _setLocker () {
    this.locker = true
  }

  /**
   * 释放锁
   * @private
   */
  _releaseLocker () {
    this.locker = false
  }
}

export { WaterFlow }