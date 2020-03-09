/**
 * @author: Argus
 * @description TODO
 * @date 2020/3/2 0:50
 */
import { HTTP } from '../utils/http'

class SalesExplain {

  static getSalesExplain () {
    return HTTP.request({
      url: '/v1/sale_explain/fixed',
    })
  }
}

export { SalesExplain }