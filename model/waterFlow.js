import { HTTP } from '../utils/http'

/**
 * @author: Argus
 * @description WaterFlow封装获取最热商品sku的业务模型类
 * @date 2020/2/11 23:31
 */
class WaterFlow {
  static async getSkuLatest (start_num=0,count_num=5) {
    return await HTTP._request({
      url: '/v1/spu/latest',
      data: {
        start: start_num,
        count: count_num
      }
    })
  }


}

export { WaterFlow }