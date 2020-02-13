import { HTTP } from '../utils/http'

/**
 * @author: Argus
 * @description WaterFlow封装获取最热商品sku的业务模型类
 * @date 2020/2/11 23:31
 */
class WaterFlow {
  static url = '/v1/spu/latest'

  static async getSkuLatest () {
    const res = await HTTP.request({
      url: WaterFlow.url,
      // data:{}
    })
    return res.data
  }
}

export { WaterFlow }