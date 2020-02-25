/**
 * @author: Argus
 * @description TODO
 * @date 2020/2/20 17:28
 */
import { HTTP } from '../utils/http'

class Paging {
  count
  start
  url
  req
  locker
  moreData
  accumulator = []

  //  这边用req = {url,method,data}
  constructor (req, count = 5, start = 0) {
    this.count = count
    this.start = start
    this.req = req
    this.url = req.url
  }

  /**
   * 对原始的url进行一个处理 防止在请求里面是以下这种情况 所以构造实例时候加了this.url = req.url
   *  '/v1/spu/latest?options=1&test=2&start=0&count=5'
   * @private
   */
  _getCurrentUrl () {
    let url = this.url //这边的this.url不能从this.req获取 防止这种情况/v1/spu/latest?options=1
    const params = `start=${this.start}&count=${this.count}`
    console.log(params)
    if (url.includes('?')) {
      url += '&' + params
    } else {
      url += '?' + params
    }
    // 这边特地赋值到this.req.url 因为发请求的还是this.req
    this.req.url = url
    console.log(url)
    return this.req
  }

  /**
   * 对外开放的获取瀑布流数据的方法
   */
  async getMoreData () {
    if (!this._getLocker()) return // 假如不能获取到锁就return 保证当前请求完成后解锁
    // 发送请求
    const res = await this._actualGetData()

    this._releaseLocker()
    if (!this.moreData) {
      this._getLocker()
    }
    return res
  }

  /**
   *  去定义返回的数据结构 就像模拟后端定义然后给调用方处理
   *  {
   *     判断当前的paging数据是否为空
   *     empty: boolean,
   *     当前请求获取到的Items数组
   *     items:[],
   *     判断是否需要更多的数据
   *     moreData:boolean,
   *     累加器 累加获取的数据
   *     accumlator:[]
   *  }
   * @returns {{moreData: boolean, accumulator: [], items: [], empty: boolean}}
   * @private
   */
  async _actualGetData () {
    const req = this._getCurrentUrl()
    let paging = await HTTP.request(req)
    // console.log(paging)
    // 500 报错
    if (!paging) {
      return null
    }
    // total_page为0 意味着 返回数组为空
    // console.log(paging.total_page === 0)
    if (paging.total_page === 0) {
      return {
        empty: true,
        items: [],
        moreData: false,
        accumulator: []
      }
    }
    this.moreData = this._moreData(paging.total_page, paging.page)
    let arr = paging.items
    if (this.moreData) {
      this.start += this.count
    }else {
      return
    }
    return {
      empty: false,
      items: arr,
      moreData: true,
      accumulator: this.accumulator.push(...arr)
    }

  }

  _moreData (totalPage, pageNum) {
    // 意味着没有更多的数据了 会返回false
    return pageNum < totalPage - 1
  }

  /**
   * 如果处于false 无法获取锁来代表加锁
   * @returns {boolean}
   * @private
   */
  _getLocker () {
    // 锁住了 返回false 不允许拿到锁 调用者return掉就可以保证 锁的效果
    if (this.locker) {
      // 意思是指 获取不到锁
      return false
    }
    // 解锁 赋值为true
    this.locker = true
    return true
  }

  /**
   * 释放锁 还原成false
   * @private
   */
  _releaseLocker () {
    this.locker = false
  }
}

export { Paging }