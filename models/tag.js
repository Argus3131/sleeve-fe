import { HTTP } from '../utils/http'

/**
 * @author: Argus
 * @description TODO
 * @date 2020/2/15 10:12
 */


class Tag {

  static async getProductTags() {
    return await HTTP.request({
      url: "/v1/tag/type/1",
    })
  }
}

export {Tag}