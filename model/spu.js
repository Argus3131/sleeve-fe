/**
 * @author: Argus
 * @description TODO
 * @date 2020/2/15 23:36
 */
import { HTTP } from '../utils/http'

class Spu {
  static async getSpu (product_id) {
    return await HTTP.request({
      url: `/v1/spu/id/${product_id}/detail`
    })
  }
}

export {Spu}