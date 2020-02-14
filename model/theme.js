import { HTTP } from '../utils/http'
import array from '../miniprogram_npm/lin-ui/common/async-validator/validator/array'

/**
 * @author: Argus
 * @description Theme业务模型类 封装主题的请求
 * @date 2020/2/11 19:45
 */
// 用对象的映射关系管理 t-1对应的主题在页面中的关系
const locations_map = {
  't-1': 'locationA',
  't-2': 'locationE',
  't-3': 'locationF',
  't-5': 'locationG',
  't-4': 'locationH',
  't-6': 'locationI'
}

class Theme {
  static themes = {}
  static locations = ['t-1', 't-2','t-3', 't-4', 't-5', 't-6']
  /**
   *  async function 声明用于定义一个返回 AsyncFunction 对象的异步函数。
   *  异步函数是指通过事件循环异步执行的函数，它会通过一个隐式的 Promise 返回其结果。
   *  1.在一个函数前面使用了async关键字，那么这个函数就会返回一个promise。
   *  2.如果你返回的不是一个promise，JavaScript也会自动把这个值"包装"成Promise的resolve值
   * @returns {Promise<{}|*>}
   */
  static async getThemes () {
    //当 async 函数抛出异常时，Promise 的 reject 方法也会传递这个异常值
    // await 操作符用于等待一个Promise 对象。它只能在异步函数 async function 中使用。
    const res = await HTTP.request({
      url: '/v1/theme/by/names',
      data: {
        names: `${Theme.locations.join(',')}`
      }
    })
    // 使用 对象去保存 页面加载init数据时候获取的值 然后保存到对象里面
    // 而非open这个getThemes函数让视图层 频繁 的发起请求 这样对于服务器不太友好
    Theme.themes = Theme._setThemesObj(res.data, Theme.locations)
    const themes = Theme._getThemesObj()
    if (themes == null) {
      return res.data
    }
    return themes
  }

  /**
   * 获取sku_scoll
   * @param theme_name sku_scoll
   * @returns {Promise<*>}
   */
  static async getLocationE(theme_name) {
    const res = await HTTP.request({
      url: `/v1/theme/name/${theme_name}/with_spu`,
    })
    return res.data
  }

  /**
   * 获取主题对象保存页面待渲染的内容
   * @returns {{}|null}
   * @private Theme
   */
  static _getThemesObj () {
    if (Object.keys(Theme.themes).length === 0) {
      return null
    } else {
      return Theme.themes
    }
  }


  /**
   * ["locationA":{},{}]
   * @param themes_arr
   * @param location_arr
   * @returns 形如此["locationA":{},{}] 数据结构的返回值
   * @private Theme
   */
  static _setThemesObj (themes_arr, location_arr) {
    if (themes_arr.length === 0 && location_arr.length === 0) {return}
    for (let location of location_arr) {
      const item = themes_arr.find(item => item.name === location)
      if (!item) {
        continue
      }
      const new_key = locations_map[location]
      if (locations_map[location]) {
        Theme.themes[new_key] = item
      }

    }
    return Theme.themes
  }


  static async _getLocationA () {
    const res = await HTTP.request({
      url: Theme.url,
      data: {
        names: `${Theme.locationA}`
      }
    })
    return res.data
  }

  static async _getLocationE () {
    const res = await HTTP.request({
      url: Theme.url,
      data: {
        names: `${Theme.locationA}`
      }
    })
    return res.data
  }
}

export { Theme }