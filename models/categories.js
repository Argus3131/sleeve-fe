import { HTTP } from '../utils/http'

/**
 * @author: Argus
 * @description TODO
 * @date 2020/3/2 15:41
 */

class Categories {
  roots = []
  subs = []

  async getCategoryAll () {
    const res = await HTTP.request({
      url: '/v1/category/all'
    })
    this.roots = res.roots
    this.subs = res.subs
  }

  getRoots () {
    return this.roots
  }

  /**
   * 通过filter 将后端返回的 相同1级节点的数据过滤出来便于展示
   * @param rootId
   * @returns {*[]}
   */
  getSubs (rootId) {
    // find只能找到第一个 但是filter能找到 符合条件的 全部的子元素
    return this.subs.filter(r => rootId === r.parent_id)
  }
}

export { Categories }