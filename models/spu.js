/**
 * @author: Argus
 * @description TODO
 * @date 2020/2/15 23:36
 */
import { HTTP } from '../utils/http'
import { Paging } from './paging'

class Spu {
  static paging = null

  static async getSpu (product_id) {
    return await HTTP.request({
      url: `/v1/spu/id/${product_id}/detail`
    })
  }

  static async getSpuLatest () {
    const req = {
      url: '/v1/spu/latest',
    }

    if (!Spu.paging) {
      Spu.paging = new Paging(req)
    }
    return Spu.paging.getMoreData()
  }

}

export { Spu }