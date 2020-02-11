import { config } from '../config/config'
import { promisic } from '../miniprogram_npm/lin-ui/utils/util'

/**
 * @author: Argus
 * @description Http请求封装类
 * @date 2020/2/11 19:45
 */
class HTTP {
  // // 封装wx.request
  // static request ({ url, method = 'GET', data, callback }) {
  //   wx.request({
  //     url: `${config.apiBaseUrl}` + url,
  //     header: {
  //       'content-type': 'application/json',
  //       'appkey': `${config.appkey}`
  //     },
  //     method: method,
  //     data: data,
  //     success (res) {
  //       callback(res.data)
  //     }
  //   })
  // }

  // 使用async 和 await封装 HTTP请求
  static async request ({ url, method = 'GET', data}) {
    return await promisic(wx.request)({
      url: `${config.apiBaseUrl}${url}`,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      method: method,
      data: data
    })
  }

}

export { HTTP }