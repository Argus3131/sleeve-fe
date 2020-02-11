import { HTTP } from '../utils/http'

/**
 * @author: Argus
 * @description Theme业务模型类 封装主题的请求
 * @date 2020/2/11 19:45
 */
class Theme {
  static url = '/v1/theme/by/names'

  static async getLocationA () {
    const res = await HTTP.request({
      url: Theme.url,
      data: {
        names: 't-1'
      }
    })

    return res.data
  }
}

export { Theme }