import { HTTP } from '../utils/http'

/**
 * @author: Argus
 * @description Theme业务模型类 封装主题的请求
 * @date 2020/2/11 19:45
 *  当 async 函数抛出异常时，Promise 的 reject 方法也会传递这个异常值
 *  当 await 操作符用于等待一个Promise 对象。它只能在异步函数 async function 中使用。
 *  async function 声明用于定义一个返回 AsyncFunction 对象的异步函数。
 *  异步函数是指通过事件循环异步执行的函数，它会通过一个隐式的 Promise 返回其结果。
 *  1.在一个函数前面使用了async关键字，那么这个函数就会返回一个promise。
 *  2.如果你返回的不是一个promise，JavaScript也会自动把这个值"包装"成Promise的resolve值
 *
 */
// 这边考虑了一下还是用js 对象的映射关系管理
// 主题在页面中的对应关系
const locations_map = {
  'locationA': 't-1',
  'locationE': 't-2',
  'locationF': 't-3',
  'locationG': 't-5',
  'locationH': 't-4',
  'locationI': 't-6',
}

class Theme {
  // 不建议 使用这种类变量去保存数据状态 不便于管理 static themes= [] 或 {}
  static locations = ['t-1', 't-2', 't-3', 't-4', 't-5', 't-6']
  // *建议使用
  themes = []

  /**
   * 这边写成非静态的方法 供外部的对象调用
   * @returns {Promise<void>}
   */
  async getThemes () {
    // * 亮点就在于这个this.themes = theme 真正的用对象保存 是将属性赋值 给对象
    // * 让对象去将数据状态保存下来
    // this指代这个类的实例
    this.themes = await HTTP.request({
      url: '/v1/theme/by/names',
      data: {
        names: `${Theme.locations.join(',')}`
      }
    })
  }

  /**
   *     {
   *        "id": 1,
   *        "title": "清凉一夏，折扣季",
   *        ...
   *        "name": "t-1",
   *        ...
   *      }
   * @returns {Promise<void>}
   */
  getLocationA () {
    return this.themes.find(element => element.name === locations_map.locationA)
  }

  getLocationF () {
    return this.themes.find(element => element.name === locations_map.locationF)
  }

  getLocationH () {
    return this.themes.find(element => element.name === locations_map.locationH)
  }

  /**
   * 获取获取单个专题的详情（含Spu数据）：sku_scoll
   * @param theme_name sku_scoll
   * @returns {Promise<*>}
   */
  static getLocationESpu () {
    return HTTP.request({
      url: `/v1/theme/name/${locations_map.locationE}/with_spu`,
    })
  }
}

export { Theme }