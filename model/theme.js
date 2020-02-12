import { HTTP } from '../utils/http'

/**
 * @author: Argus
 * @description Theme业务模型类 封装主题的请求
 *
 * @date 2020/2/11 19:45
 */
class Theme {
  static url = '/v1/theme/by/names'
  //async function 声明用于定义一个返回 AsyncFunction 对象的异步函数。异步函数是指通过事件循环异步执行的函数，它会通过一个隐式的 Promise 返回其结果。
  //   1.在一个函数前面使用了async关键字，那么这个函数就会返回一个promise。
  //   2.如果你返回的不是一个promise，JavaScript也会自动把这个值"包装"成Promise的resolve值
  static async getLocationA () {
    //当 async 函数抛出异常时，Promise 的 reject 方法也会传递这个异常值
    // await 操作符用于等待一个Promise 对象。它只能在异步函数 async function 中使用。
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