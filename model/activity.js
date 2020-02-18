/**
 * @author: Argus
 * @description TODO
 * @date 2020/2/12 19:56
 */
import { HTTP } from '../utils/http'

class Activity {
  static async getLocationD () {
    const res = await HTTP.request({
      url: '/v1/activity/name/a-2',
    })
    return res.data
  }
}

export { Activity }