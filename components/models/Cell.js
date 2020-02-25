/**
 * @author: Argus
 * @description TODO
 * @date 2020/2/22 19:55
 */
import { CellStatus } from '../code/enum'

class Cell {
  // value_id
  id
  // value
  title
  // 状态枚举
  status


  constructor (spec) {
    this.id = spec.value_id
    this.title = spec.value
    this.status = CellStatus.WAITING
  }
}

export { Cell }