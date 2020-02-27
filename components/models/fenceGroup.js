/**
 * @author: Argus
 * @description TODO
 * @date 2020/2/22 19:15
 */
import { Fence } from './fence'
import { Matrix } from './matrix'
import { Cell } from './cell'

class FenceGroup {
  spu
  // 保存传入的skuList
  skuList = []
  fences
  fencesNames = []
  skuResult_martix = []

  constructor (spu) {
    this.spu = spu
    this.skuList = spu.sku_list
  }

  init () {
    this._initFences()
  }

  _initFences () {
    // const m = []
    // 将后端数据 处理成 [[],[],[]]数据格式
    this.skuList.forEach(sku => {
        // console.log(sku)
        this.skuResult_martix.push(sku.specs)
      }
    )
    // console.log(this.skuResult_martix)
    // 交给这个Matrix去转置矩阵
    const matrix = this._createMatrix(this.skuResult_martix)
    const matrix_alter = matrix.transpose()
    const fences = []

    matrix_alter.forEach((spec, index) => {
      const fence = new Fence(spec, index)
      fence.createCells()
      fences.push(fence)
      this.fencesNames.push(fence.getSpecName())
    })
    this.fences = fences
    // this.init_C()
  }

  _createMatrix (matrix) {
    return new Matrix(matrix)
  }

  setImg() {
    let img = null
    if (this.spu.img) {
      return img = this.spu.img
    }else if (this.spu.for_theme_img) {
      return img = this.spu.img
    }else  {
      return img = this.spu.spu_img_list[0].img
    }
  }


  setTitle() {
    return this.spu.title
  }


  init_C () {
    const sketchSpecId = this.returnSketchSpecId()
    if (sketchSpecId === -1) return
    const sketchSpec = this.fences.find((ele, x) => {
      return sketchSpecId === ele.id
    })
    if (!sketchSpec) return
    const spec_0 = sketchSpec.cells

    // 根据信息获取坐标
    const cell = new Cell(spec_0)
    const key_id = spec_0.key_id
    // 获取cell位置

    const location = this.returnCellLocation(cell, key_id)
    if (this.fences[location.x].cells[location.y].img) return
    this.fences[location.x].cells[location.y].img = sku.img

  }

  /**
   * 返回给定cell值的具体行号列号
   * @param cell
   * @param key_id
   * @returns {{x: number | *, y: number}}
   */
  returnCellLocation (cell, key_id) {
    let x = this.fences.findIndex((fence) => {
      return fence.id === key_id
    })
    if (x === -1) return
    let y = this.fences[x].cells.findIndex((item) => {
        return item.id === cell.id
      }
    )
    return {
      x: x,
      y: y
    }
  }

  /**
   * 返回某组sku原始结果集规格二维数组 的某一组数据[specs1[{}{}{}],specs2[]]
   * @param x
   * @returns {*}
   */
  returnOneGroupSpecs (x) {
    if (x >= this.skuResult_martix.length) return
    return this.skuResult_martix[x]
  }

  /**
   * 返回完整一组原始完整sku结果规格的信息 img price stock等信息
   * @param callback
   */
  returnOneGroupSku (callback) {
    for (let i = 0; i < this.skuList.length; i++) {
      callback(this.skuList[i], i)
    }
  }

  /**
   * 返回默认值规格的skuList的index
   * @returns {number}
   */
  findDefaultSkuIndex () {
    const id = this.spu.default_sku_id
    return this.skuList.findIndex(element => (element.id === id))
  }

  /**
   * 返回可视规格对应的sku的key_id 与转置后的矩阵对应
   * @returns {*}
   */
  returnSketchSpecId () {
    const id = this.spu.sketch_spec_id
    return id
  }

  /**
   * 返回所有已存在SKU的最大价格 和最小价格
   */
  returnSpuPriceInterval () {
    let arr = []
    this.returnOneGroupSku((element, i) => {
      if (element) {
        if (element.discount_price) {
          arr.push(element.discount_price)
        }
        if (element.price) {
          arr.push(element.price)
        }
      }
    })
    const max = arr.reduce(function (a, b) {
      return b > a ? b : a
    })
    const min = arr.reduce(function (a, b) {
      return b < a ? b : a
    })
    return {
      max: max,
      min: min
    }
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