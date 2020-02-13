import {
  HTTP
} from '../utils/http'

/**
 * @author: Argus
 * @description Banner
 * @date 2020/2/11 21:53
 */
class Banner {
  static url_b1 = '/v1/banner/name/b-1'

  static async getLocationB() {
    const res = await HTTP.request({
      url: Banner.url_b1,
    })
    const banner = res.data
    return banner
  }


}

export {
  Banner
}