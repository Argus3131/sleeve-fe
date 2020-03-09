/**
 * @author: Argus
 * @description TODO
 * @date 2020/2/23 16:00
 */
import { SkuCode } from './skuCode'
import { CellStatus } from '../code/enum'
import { Joiner } from '../../utils/common'
import { SkuPending } from './sku-pending'
import { Cell } from './cell'

/**
 * Judger判断类 里面初始化获取所有存在规格结果集的情况
 * 并控制skuCode类去处理组装成全部的预期结果字典 ["str",...]
 *
 * sku算法的核心：
 * 明确待确认的sku路径 潜在路径
 * 明确已存在的sku路径 结果集
 *  在以上条件满足时候：
 *  1. 已选中的cell不用在判断是否是潜在路径
 *  2. 最关键的是对于每个cell，它的当前行与其他行已选的cell 组成的潜在路径 在 结果集中是否存在
 *  3. 对于每个cell 是不需要考虑当前行其他cell是否可选的
 */
class Judger {
  fenceGroup
  skuPending
  skuCode
  pathDict = []

  /**
   *    ***********入口方法*********
   * 无规格商品的处理 直接加入pending点开即可看见 类似默认规格
   * @param fenceGroup
   */
  constructor (fenceGroup) {
    this.fenceGroup = fenceGroup
   // 如果是无规格的商品 直接取第一组数据插入pending
    if (this.judgeWithouSku()) return
    // 有规格初始化 所有的结果放入[]保存
    this._initPathDict()
    //  记录长度便于后期判断是否选满
    this.skuPending = new SkuPending(fenceGroup.fences.length,fenceGroup.fencesNames)
  }

  /**
   * 判断是否无规格
   * @returns {boolean}
   */
  judgeWithouSku () {
    if (this.fenceGroup.spu.sku_list.length === 1 && this.fenceGroup.spu.sku_list[0].specs.length === 0) {
      this.withoutSkuInsertPending()
      return true
    }
    return false
  }

  /**
   * 无规格处理sku
   */
  withoutSkuInsertPending () {
    this.skuPending = new SkuPending(1)
    this.skuPending.insertPending(this.fenceGroup.skuList[0],0)
  }

  /**
   * 初始化 已存在结果数组
   * @private
   */
  _initPathDict () {
    this.fenceGroup.spu.sku_list.forEach(spec => {
      // 处理原始code 返回预期结果数组
      const skuCode = new SkuCode(spec.code)
      this.skuCode = skuCode
      // 获取当前迭代的 结果数组
      const segs = skuCode.totalSegments
      // concat返回一个新数组 并不会改变原数组 所以要赋值
      this.pathDict = this.pathDict.concat(segs)
    })
  }

  /**
   * 初始化时候定默认的规格路径
   * 这边取结果集的第一组
   */
  initDefalutSku () {
    const id = this.fenceGroup.findDefaultSkuIndex()
    if (id === -1) return
    // 获取结果集的某组规格
    const skus = this.fenceGroup.returnOneGroupSpecs(id)
    // 转换成cell 后遍历
    for (let sku of skus) {
      // 记录cell信息
      const cell = new Cell(sku)
      const key_id = sku.key_id
      // 获取cell位置
      const location = this.fenceGroup.returnCellLocation(cell, key_id)
      this.judgeAllStatus(cell, location.x, location.y)
    }
  }

  /**
   * 初始化可视规格
   */
  initSketchSpeC () {
    // 获取未转置fences
    const sketchSpecs = this.getSketchSpec()
    if (!sketchSpecs) return
    this.fenceGroup.returnOneGroupSku(
      (sku, i) => {
        // 获取cell信息：结果矩阵和当前的skuList的顺序是一一对应的 取规格：颜色
        // 假设取所有的就得在 这里再遍历取i时候的skus 拿到所有cell位置
        const spec = sketchSpecs[i]
        // // 根据信息获取坐标
        const cell = new Cell(spec)
        const key_id = spec.key_id
        // 获取cell位置
        const location = this.fenceGroup.returnCellLocation(cell, key_id)
        if (this.fenceGroup.fences[location.x].cells[location.y].img) return
        this.fenceGroup.fences[location.x].cells[location.y].img = sku.img
      }
    )
  }

  /**
   * 获取可视规格
   * 相同可视规格的key_id 是一样的
   */
  getSketchSpec () {
    const sketchSpecId = this.fenceGroup.returnSketchSpecId()
    if (sketchSpecId === -1) return
    const sketchSpec = this.fenceGroup.fences.find((ele) => {
      return sketchSpecId === ele.id
    })
    if (!sketchSpec) return
    return sketchSpec.specs
  }

  /**
   * *********主逻辑入口方法*********
   * 每当选中一个cell遍历全部 判断潜在路径来
   *
   * 根据上面的核心规律当前行和其他行的已选cell组成潜在路径是否可选
   *
   * 依此实现判断是否可选
   *  这边可以优化一下 累加器已满 且点击禁用就不在判断
   * @param cell
   *
   * @param x
   * @param y
   */
  judgeAllStatus (cell, x, y) {
    if (this.skuPending.judgePendingFull() && cell.status === CellStatus.FORBIDDEN) return
    this._judgeCurrentCellStatus(cell, x, y)
    this._judgeOtherCellStatus(cell, x, y)
  }

  /**
   * 按照往常的方法我们可能选择的解决方案：获取对象保存的数据 然后在外部进行迭代。
   * 那么反转一下思维 我们从对象定义的方法去拿到我们待处理的数据，将适合该类的行为进行封装
   * 这样提高代码可读性 调用者无须考虑实现 只需考虑拿到数据即可
   * * 好处避免了过多层的循环
   * * 提高代码可读性、可维护性 降低耦合程度
   * @param cell
   * @param x
   * @param y
   * @private
   */
  _judgeOtherCellStatus (cell, x, y) {
    // 迭代所有cell 需要一个方法==>再者对象或类或去迭代 不断返回迭代的结果
    this.fenceGroup.returnEachCells((cell, i, j) => {
      // console.log({
      //   cell:cell,
      //   i:i,
      //   j:j
      // })
      //获取每个cell的潜在路径
      const potentialPath = this._findPotentialPath(cell, i, j)
      // console.log(potentialPath)
      // 判断是否存在
      const potentialPathExisted = this._isInDict(potentialPath)
      // 更新状态
      if (potentialPathExisted) {
        // Bug:1.对于已选择的cell无须更改为waiting 以及2. 实现同一行只能选一个
        // 把Bug转换成CurrentCell不判断 并且对于其他的cell都更改为waiting即可
        // 说白了就是每次选 出去选中不判断 其他的要么waiting 要么forbidden
        const CellSelectedEqualsCurrentCell = this.skuPending.judgeCellSelectedEqualsCurrentCell(cell, i)
        if (CellSelectedEqualsCurrentCell) {
          this.skuPending.currentPath = potentialPath
          return
        }
        this.fenceGroup.fences[i].cells[j].status = CellStatus.WAITING
      } else {
        this.fenceGroup.fences[i].cells[j].status = CellStatus.FORBIDDEN
      }
    })
    // 渲染页面
  }

  /**
   * 找到用户确定的商品[即规格名全部选择]
   */
  findDefinedSKU () {
    // 选满三个 代表确定一个商品
    const full = this.skuPending.judgePendingFull()
    if (full) {
      // 找到code对应的sku全部信息
      const element = this.fenceGroup.skuList.find(element => {
        const arr = element.code.split('$')
        return arr[1] === this.skuPending.currentPath
      })
      if (element) {
        // console.log(element)
        return element
      }
    }
  }

  /**
   * 比较潜在路径是否在这个结果集字典
   * @param potentialPath
   * @returns {boolean}
   * @private
   */
  _isInDict (potentialPath) {
    return this.pathDict.includes(potentialPath)
  }

  /**
   * 这个点击包括了 选中cell 取消选中cell 正反规则一致
   * 每次点击单个cell规格值查找所有的潜在路径
   * 定义：当前行：当前的传入cell所在的行，叫做当前行
   *      其他行：当前的传入cell传入行号不同的行，叫做其他行
   * 思路：
   *      sku关键在于 找到当前行与其他行已选中到cell组成一个路径
   *      然后 将所有的潜在路径 再去和结果集进行匹配
   * @param cell 单个cell 配合迭代每个cell就能获取所有潜在路径
   * @param rowNum
   * @param columnNum
   * @returns {string}
   * @private
   */
  _findPotentialPath (cell, rowNum, columnNum) {
    const joiner = new Joiner('#')
    // 遍历行 对应页面的行顺序自上而下的迭代 保证了拿到的code始终是从小到大的 避免了一次排序
    for (let i = 0; i < this.fenceGroup.fences.length; i++) {
      if (i === rowNum) {
        //当前行
        // 获取当前行的规格名id
        const key_id = this.fenceGroup.fences[i].id
        // console.log(key_id)
        // 获取当前cell的规格值id
        const value_id = cell.id
        // console.log(value_id)
        const code = this._spliceStr(key_id, value_id)
        joiner.join(code)
      } else {
        // 其他行已选
        // # 定义了一个新类 用来存储用户已选的数据skuPending
        // ## 注：  findCellByRowNum(i)的行号必须是可迭代的动态查找其他所有行
        //          如果传入rowNum会导致只查找了当前已选cell的行
        const cell_selected = this.skuPending.findCellByRowNum(i)
        // 为真 其他存在已选cell
        if (cell_selected) {
          const key_id = this.fenceGroup.fences[i].id
          const value_id = cell_selected.id
          const code = this._spliceStr(key_id, value_id)
          joiner.join(code)
        }
      }
    }
    const str = joiner.getStr()
    // console.log(str)
    return str
  }

  _spliceStr (str1, str2) {
    return str1 + '-' + str2
  }

  /**
   * 当前点击的cell判断状态 并更改状态
   * @param cell_current 注意这个cell假如是渲染层返回的cell那不能直接使用
   *        得获取cell位置后拿到原始cell
   *        或拿new Cell去保存渲染层传递的数据和状态
   * @param x
   * @param y
   */
  _judgeCurrentCellStatus (cell_current, x, y) {
    if (cell_current.status === CellStatus.WAITING) {
      // 更改选中的状态
      this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED
      // 保存已经点击的cell值 和行号 这边没将cell_current存入pending原因同上
      this.skuPending.insertPending(this.fenceGroup.fences[x].cells[y], x)
      return
    }
    if (cell_current.status === CellStatus.SELECTED) {
      //  找到对应的cell x y
      //  更改对应的状态
      this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
      this.skuPending.removeCell(x)
    }
  }

  /**
   *  获取当前选满的code码
   */
  getFullSku() {
    const isFull = this.skuPending.judgePendingFull()
    if (isFull) {
      return this.skuCode.spuId + "$" + this.skuPending.currentPath
    }
    return null
  }




}

export { Judger }