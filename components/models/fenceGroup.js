/**
 * @author: Argus
 * @description TODO
 * @date 2020/2/22 19:15
 */
import { Fence } from './fence'
import { Matrix } from './matrix'

class FenceGroup {
  spu
  // 保存传入的skuList
  skuList = []
  fences
  skuResult_martix = []

  constructor (spu) {
    this.spu = spu
    this.skuList = spu.sku_list
  }

  init() {
    this._initFences()
  }

  _initFences () {
    // const m = []
    // 将后端数据 处理成 [[],[],[]]数据格式
    this.skuList.forEach(sku => {
        this.skuResult_martix.push(sku.specs)
      }
    )
    console.log(this.skuResult_martix)
    // 交给这个Matrix去转置矩阵
    const matrix = this._createMatrix(this.skuResult_martix)
    const matrix_alter = matrix.transpose()
    const fences = []
    matrix_alter.forEach((spec, index) => {
      const fence = new Fence(spec, index)
      fence.createCells()
      fences.push(fence)
    })
    this.fences = fences
  }

  _createMatrix (matrix) {
    return new Matrix(matrix)
  }

  /**
   * 返回给定cell值的具体行号列号
   */
  returnCellLocation(cell,key_id) {
    let x = this.fences.findIndex((fence)=>{
      return fence.id === key_id
    })
    if (x === -1) return
    let y = this.fences[x].cells.findIndex((item)=>{
      return item.id === cell.id
      }
    )
    return {
      x:x,
      y:y
    }
  }

  /**
   * 返回某组sku规格数据数组
   * @param x
   * @returns {*}
   */
  returnOneGroupSku (x) {
    if (x >= this.skuResult_martix.length) return
    return this.skuResult_martix[x]
  }

  /**
   * i 行号
   * j 列号
   * 遍历fences数组返回每一个cell对象
   * @param callBack 接受一个回调函数  返回迭代的cell对象
   */
  returnEachCells (callBack) {
    console.log()
    for (let i = 0; i < this.fences.length; i++) {
      for (let j = 0; j < this.fences[i].cells.length; j++) {
        const element = this.fences[i].cells[j]
        callBack(element, i, j)
      }
    }
  }




}

export { FenceGroup }