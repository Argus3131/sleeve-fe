/**
 * @author: Argus
 * @description TODO
 * @date 2020/2/15 23:36
 */
import { HTTP } from '../utils/http'

class Spu {
  static url = '/v1/spu/id/15/detail'

  static async getSpu (product_id) {
    const res = await HTTP.request({
      url: `/v1/spu/id/${product_id}/detail`
    })
    return res.data
  }
}

export {Spu}