import { HTTP } from '../utils/http'

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
    return await HTTP.request({
      url: '/v1/banner/name/b-1',
    })
  }

  /**
   * 活动banner
   * @returns {Promise<*>}
   */
  static async getLocationG() {
    return await HTTP.request({
      url: '/v1/banner/name/b-2',
    })
  }
}

export {
  Banner
}