/**
 * @author: Argus
 * @description TODO
 * @date 2020/2/11 23:31
 */
import { HTTP } from '../utils/http'

class WaterFlow {
  static url = '/v1/spu/latest'

  static async getSkuLatest () {
    const res = await HTTP.request({
      url:WaterFlow.url,
      // data:{}
    })
    return res.data
  }
}

export {WaterFlow}