/**
 * @author: Argus
 * @description TODO
 * @date 2020/2/23 15:52
 */
import { combination } from '../../utils/common'

/**
 * 每个skucode的组合类
 * 封装了对原数据的处理以及返回已存在规格的组合数组totalSegments
 */
class SkuCode {
  spuId
  code = []
  totalSegments = []

  constructor (code) {
    this._splitToSegment(code)
    this._combinateSpec(this.code, this.code.length)
  }

  _splitToSegment (code) {
    //"2$1-45#3-9#4-14"
    const arr = code.split('$')
    this.spuId = arr[0]
    this.code = arr[1].split('#')

  }

  _combinateSpec (arr) {
    for (let i = 1; i < arr.length + 1; i++) {
      const arr_c = combination(arr, i)
      // 返回的是一个数组 将它变成二维数组
      // 1-45#3-9 1-45 1-45#3-9#4-14
      // arr_c.map(ele => {
      //   this.totalSegments.push(ele.join("#"))
      // })
      // 以上注释的push也可实现 但是push是在改变原数组
      const newSegments = arr_c.map(segs => {
        return segs.join("#")
      })
      // concat拼接 返回一个新数组 并不会改变原数组 所以要赋值
      this.totalSegments = this.totalSegments.concat(newSegments)
    }
    // console.log(this.totalSegments)
  }

}

export { SkuCode }