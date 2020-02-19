import { HTTP } from '../utils/http'

/**
 * @author: Argus
 * @description Banner
 * @date 2020/2/11 21:53
 */
class Banner {
  static locationB = "b-1"
  static locationG = "b-2"
  /**
   * 顶部banner
   * @returns {Promise<*>}
   */
  static async getLocationB() {
    return await HTTP.request({
      url: `/v1/banner/name/${Banner.locationB}`,
    })
  }

  /**
   * 活动banner
   * @returns {Promise<*>}
   */
  static async getLocationG() {
    return await HTTP.request({
      url: `/v1/banner/name/${Banner.locationG}`,
    })
  }
}

export {
  Banner
}