import {
  HTTP
} from '../utils/http'

/**
 * @author: Argus
 * @description Banner
 * @date 2020/2/11 21:53
 */
class Banner {
  /**
   * 顶部banner
   * @returns {Promise<*>}
   */
  static async getLocationB() {
    const res = await HTTP.request({
      url: '/v1/banner/name/b-1',
    })
    const banner = res.data
    return banner
  }

  /**
   * 活动banner
   * @returns {Promise<*>}
   */
  static async getLocationG() {
    const res = await HTTP.request({
      url: '/v1/banner/name/b-2',
    })
    const banner = res.data
    return banner
  }
}

export {
  Banner
}