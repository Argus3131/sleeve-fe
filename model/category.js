/**
 * @author: Argus
 * @description Category
 * @date 2020/2/11 23:31
 */
import { HTTP } from '../utils/http'

class Category {
  static async getLocationC(){
    const res = await HTTP.request({
      url:'/v1/category/grid/all'
    })
    return res.data
  }
}

export { Category }