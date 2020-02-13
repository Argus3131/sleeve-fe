/**
 * @author: Argus
 * @description TODO
 * @date 2020/2/12 19:56
 */
import { HTTP } from '../utils/http'

class Actvity {
  static url ="/v1/activity/name/a-2"

  static async getLocationD() {
    const res = await HTTP.request({
      url:Actvity.url,
    })
    return res.data
  }
}

export {Actvity}