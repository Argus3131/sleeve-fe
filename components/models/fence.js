/**
 * @author: Argus
 * @description TODO
 * @date 2020/2/22 19:15
 */
import { Cell } from './cell'

/**
 * 存储相同规格名和 具体规格信息的specs=[{}{}{}] 前提是转置过后的
 */
class Fence {
  // 规格名包含的一组规格值
  cells = []
  // 当前的一组规格集合 颜色[] 图案...
  specs
  // key_id
  id
  // key
  title


  constructor (specs) {
    this.specs = specs
    this.id = specs[0].key_id
    this.title = specs[0].key
  }

  createCells () {
    // 遍历规格数组specs = [{} {} {}]
    this.specs.forEach((spec) => {
        const cell = new Cell(spec)
        // 数组去重
        if (this.isDuplicate(this.cells, cell)) return
        this.cells.push(cell)
      }
    )
  }

  /**
   * 去重判断的方法 检测每个值 .some(...callback...)
   * 方法用于检测数组中的元素是否满足指定条件（函数提供）。
   * 方法会依次执行数组的每个元素：
   * 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
   * 如果没有满足条件的元素，则返回false。
   * @param arr
   * @param element
   * @returns {boolean}
   */
  isDuplicate (arr, element) {
    return arr.some(function (currentValue, index, arr) {
      return currentValue.id === element.id
    })
  }


}

export {
  Fence
}