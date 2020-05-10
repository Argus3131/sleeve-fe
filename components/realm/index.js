import { FenceGroup } from '../models/fenceGroup'
import { Judger } from '../models/judger'
import { Counter } from '../../models/counter'
import { Stock } from '../code/enum'

Component({
  properties: {
    spu: Object,
    type_button: String
  },
  data: {
    judger: null,
    count: Counter.cartMinNum,
    kindBtnPreview: null,
    defaultStock: Stock.DEFAULT_STOCK,
    selected_type_button:null
  },
  observers: {
    'type_button':function (type_button) {
      if(!type_button) {return}
      if (type_button === "buy" || type_button === "cart") {
        this.setData({ selected_type_button:type_button})
      }
    },
    'spu': function (spu) {
      if (spu) {
        const hasNoneSku = this.isHasSku(spu)
        const fenceGroup = new FenceGroup(spu)
        if (hasNoneSku) {
          // 设置样式
          this.setCounterCss(hasNoneSku)
          const judger = new Judger(fenceGroup)
          // 获取 价格区间
          const priceInterval = fenceGroup.returnSpuPriceInterval()
          // 无规格商品默认获取pending数组0索引值
          const sku = judger.skuPending.pending[0]
          // 判断是否 选满 规格组成 单品
          const isSelectFull = judger.skuPending.judgePendingFull()
          if (sku.stock >= 0) {
            this.data.stock = sku.stock
          }
          this.judgeHasStock(isSelectFull)
          this.setData({
            sku: sku,
            priceInterval: priceInterval,
            isSelectFull: isSelectFull,
            hasNoneSku: hasNoneSku
          })
          this.returnSpecChangeData(hasNoneSku)
        } else {
          this.setCounterCss(!hasNoneSku)
          // 初始化fencegroup 规格二维矩阵
          fenceGroup.init()
          // 获取未选状态的Img 和 Title
          const defalutImg = fenceGroup.setImg()
          const defalutTitle = fenceGroup.setTitle()
          const judger = new Judger(fenceGroup)
          // 初始化默认规格和可视规格
          judger.initDefalutSku()
          judger.initSketchSpeC()
          // 获取 用户选择的sku 配合 默认选中规格
          const sku = judger.findDefinedSKU()
          // if (sku) {
          //   console.log(sku)
          // }
          // 赋值data对象 供点击事件共享judger对象保存数据
          this.data.judger = judger
          // 获取 价格区间
          const priceInterval = fenceGroup.returnSpuPriceInterval()
          // 获取 规格名数组
          const specNames = fenceGroup.fencesNames
          // 获取 当前规格单品是否确定状态 即选满与否
          const isSelectFull = judger.skuPending.judgePendingFull()
          this.judgeHasStock(isSelectFull)
          // 获取fences的数组 数据绑定渲染
          const fg_fences = fenceGroup.fences
          const changeTitle = this.changeTitle()
          const code = judger.getFullSku()
          if (code) console.log(code)
          const skuD = judger.fenceGroup.getDeterminateSku(code)
          if (skuD) {
            console.log(skuD.stock)
            this.data.stock = skuD.stock
          }
          this.judgeHasStock()
          this.returnSpecChangeData(hasNoneSku, changeTitle, isSelectFull)
          this.setData({
            sku: sku,
            defalutImg: defalutImg,
            defalutTitle: defalutTitle,
            fences: fg_fences,
            specNames: specNames,
            priceInterval: priceInterval,
            isSelectFull: isSelectFull,
            changeTitle: changeTitle,
            hasNoneSku: hasNoneSku
          })
        }
      }

    }
  },
  methods: {
    isHasSku (spu) {
      return spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0
    },
    setCounterCss (hasNoneSku) {
      if (hasNoneSku) {
        this.setData({
          dynamic: 'noSku'
        })
      } else {
        this.setData({
          dynamic: 'hasSku'
        })
      }
    },
    onCellTap (event) {
      const detail = event.detail
      const cell = detail.cell
      const x = detail.x
      const y = detail.y
      const judger = this.data.judger
      // 选中时候 判断所有潜在路径是否可选的状态 再返回给页面展示
      judger.judgeAllStatus(cell, x, y)
      //引用类型 更新data的fences即可
      const fg_fences_alter = judger.fenceGroup.fences
      const sku = judger.findDefinedSKU() === undefined ? null : judger.findDefinedSKU()
      const selectedTitle = judger.skuPending.returnSelectedCellTitle()
      const code = judger.getFullSku()
      if (code) console.log(code)
      const skuD = judger.fenceGroup.getDeterminateSku(code)
      if (skuD) {
        console.log(skuD.stock)
        this.data.stock = skuD.stock
      }
      // 选择时候要判断
      const isSelectFull = judger.skuPending.judgePendingFull()
      const changeTitle = this.changeTitle()
      // 判断无货
      this.judgeHasStock(isSelectFull)
      // 返回view 提供specChange所需数据
      this.returnSpecChangeData(this.data.hasNoneSku, changeTitle, isSelectFull)
      this.setData({
        fences: fg_fences_alter,
        sku: sku,
        selectedTitle: selectedTitle,
        isSelectFull: isSelectFull,
        changeTitle: changeTitle
      })
    },
    changeTitle () {
      const skuPending = this.data.judger.skuPending
      let title = null
      // 当miss数组不为空 意味着已经进行过选择了意味着初始化过了
      if (skuPending.getMissSpecKeyStr()) {
        title = skuPending.getMissSpecKeyStr()
      } else {
        title = skuPending.getCurrentFullSpecValueStr()
      }
      return title
    },

    onClose (event) {
      this.triggerEvent('close', {
        show: false
      }, {})
    },
    onCount (event) {
      this.setData({
        count: event.detail.count
      })
      this.judgeHasStock(this.data.isSelectFull)
    },
    judgeHasStock (isSelectFull) {
      /**
       * BUG: 这边一定要清空一次type_button状态的记录否则第二次判断就会直接拿上次打开按钮状态
       */
      // this.setData({ kindBtnPreview: null })
      // if (!this.data.kindBtnPreview) {
      //   this.data.kindBtnPreview = this.properties.type_button
      // }
      // 三种缺货状态 选中规格判断规格stock
      if (isSelectFull) {
        const stock = this.data.stock
        const count = this.data.count
        if (count > stock) {
          this.setData({ type_button: 'noStock' })
        } else {
          // console.log("kindBtnPreview--"+this.data.kindBtnPreview)
          this.setData({ type_button: this.data.selected_type_button })
        }
      } else {
        const stock = this.data.defaultStock
        const count = this.data.count
        if (count > stock) {
          this.setData({ type_button: 'noStock' })
        } else {
          /**
           * 这边设置了一次 每次判断 前状态
           */
          this.setData({ type_button: this.data.selected_type_button })
        }
      }

    },
    returnSpecChangeData (hasNoneSku, changeTitle, isSelectFull) {
      if (hasNoneSku) {
        changeTitle = null
        isSelectFull = null
      }
      this.triggerEvent('specChange', {
        hasNoneSku: hasNoneSku,
        changeTitle: changeTitle,
        isSelectFull: isSelectFull
      }, {})
    }
  }
})
