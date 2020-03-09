/**
 * @author: Argus
 * @description TODO
 * @date 2020/3/3 10:51
 */
import { HTTP } from '../utils/http'

class Search {
  history = []
  static instance

  static getInstance() {
    if (!Search.instance){
      Search.instance = new Search()
    }
    return Search.instance
  }

  async getTags () {
    const url = '/v1/tag/type/1'
    const tag = await HTTP.request({
      url: url
    })
    return tag
  }

  async getSearchResult (kwd) {
    const url = `/v1/search?q=${kwd}`
    return await HTTP.request({
      url: url
    })
  }

  getHistory () {
    return wx.getStorageSync('history')
  }

  removeHistory() {
    wx.removeStorageSync('history')
  }

  setHistory (data) {
    let history  = this.getHistory()
    if (!history) {
      const _history = []
      _history.push(data)
      wx.setStorageSync('history', _history)
    }else {
      const flag = history.find(r => r===data)
      if (flag) return
      history.push(data)
      if (history.length === 16) {
        history.shift()
      }
      wx.setStorageSync('history', history)
    }
  }

}

export {
  Search
}