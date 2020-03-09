/**
 * @author: Argus
 * @description 拿到用户选择的规格值 并保存
 * @date 2020/2/25 13:56
 */
import { Joiner } from '../../utils/common'

class SkuPending {
  //用户每次选中规格值保存到pending数组 并且以行号作为数组index 1对1的查找 每行只能出现一个
  pending = []
  length
  currentPath = ''
  fencesNames = []
  miss= []

  constructor (length,fencesNames) {
    this.length = length
    this.fencesNames = fencesNames
  }

  judgePendingFull () {
    if (this.pending.length === 0) return false
    for (let i = 0; i < this.pending.length; i++) {
      // 长度没满的情况
      if (this.pending.length !== this.length) {
        return false
      }
      // empty的情况
      if (this.pending[i] === undefined) {
        return false
      }
      // 开了空间没值的情况
      if (this.pending[i] === null) {
        return false
      }
    }
    return true
  }

  /**
   * 返回已选规格值的title 和 code
   */
  returnSelectedCellTitle () {
    const joiner = new Joiner('，')
    for (let element of this.pending) {
      if (element !== null && element !== undefined) {
        joiner.join(element.title)
      }
    }
    return joiner.getStr()
  }

  /**
   * @param cell 当前选中的cell
   * @param x 当前行号
   */
  insertPending (cell, x) {
    this.pending[x] = cell
    this.removeMissingSpecKey(x)
  }

  /**
   * 删除当前取消选中的cell
   * @param x
   */
  removeCell (x) {
    this.pending[x] = null
    this.setMissingSpecKeys(x)
  }

  setMissingSpecKeys(x) {
    // const miss = []
    this.miss[x] = this.fencesNames[x]
    console.log(this.miss)
  }

  removeMissingSpecKey(x) {
    this.miss[x] = null
  }

  /**
   * 根据索引即对应的行号返回cell
   * @param x
   * @returns {cell | undefined} 返回用户选中的cell
   */
  findCellByRowNum (x) {
    return this.pending[x]
  }

  /**
   * 查找当前的cell和已选cell是否一致
   * @param x
   */
  judgeCellSelectedEqualsCurrentCell (cell, x) {
    const cell_selected = this.findCellByRowNum(x)
    if (cell_selected) {
      //  存在并且value_id一致
      return cell_selected.id === cell.id
    }
  }

  /**
   * 获取选规格值时候 失去的规格名 miss数组
   * @returns {string}
   */
  getMissSpecKeyStr() {
    const joiner = new Joiner('，')
    for (let element of this.miss) {
      if (element !== null && element !== undefined) {
        joiner.join(element)
      }
    }
    return joiner.getStr()
  }

  /**
   * 获取已选规格值的str
   * @returns {string}
   */
  getCurrentFullSpecValueStr() {
    // 如果pending数组满了
    if (this.judgePendingFull()) {
      // 返回所有规格值的str
      return this.returnSelectedCellTitle()
    }
    else {
      // 特殊情况 miss 和 pending都为空 因为没有默认规格且没有miss过规格名第一次加载无默认规格的情况
      // 返回所有规格名的str
      if (this.pending.length === 0) {
        return this.getFullSpecValueStr()
      }
    }
  }

  /**
   * 获取所有规格的值的str
   * @returns {string}
   */
  getFullSpecValueStr() {
    const joiner = new Joiner('，')
    for (let element of this.fencesNames) {
      if (element !== null && element !== undefined) {
        this.miss.push(element)
        joiner.join(element)
      }
    }
    return joiner.getStr()
  }
}

export {
  SkuPending
}