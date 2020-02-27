import { FenceGroup } from '../models/fenceGroup'
import { Judger } from '../models/judger'

Component({
  properties: {
    spu: Object,
  },
  data: {
    judger: null,
  },
  observers: {
    'spu': function (spu) {

      if (spu) {
        const hasNoneSku = this.isHasSku(spu)
        if (hasNoneSku) {
          console.log("无规格")
          const fenceGroup = new FenceGroup(spu)
          const judger = new Judger(fenceGroup)
          // console.log(judger.fenceGroup.skuList[0])
          const priceInterval = fenceGroup.returnSpuPriceInterval()
          const selectedTitle = judger.skuPending.returnSelectedCellTitle()
          const sku = judger.skuPending.pending[0]
          const isSelectFull = judger.skuPending.judgePendingFull()
          // console.log(judger.skuPending)
          // console.log(priceInterval)
          // console.log(selectedTitle)
          // console.log(isSelectFull)
          // console.log(sku)
          // selectStatus sku selectedTitle specNames priceInterval
          // selectStatus 点开就叫选中
          // sku = skupending保存的 那一个
          // specNames 无
          // returnSpuPriceInterval
            this.setData({
              sku: sku,
            selectedTitle: selectedTitle,
            priceInterval: priceInterval,
            isSelectFull: isSelectFull
          })
        } else {
          const fenceGroup = new FenceGroup(spu)
          fenceGroup.init()

          const defalutImg = fenceGroup.setImg()
          const defalutTitle = fenceGroup.setTitle()
          const judger = new Judger(fenceGroup)
          // 赋值data对象
          this.data.judger = judger
          // judger.initDefalutSku()
          // judger.initSketchSpeC()
          // 获取所有可能结果

          const priceInterval = fenceGroup.returnSpuPriceInterval()
          // console.log(fenceGroup.fences)
          // console.log(judger.skuPending.currentPath)
          const sku = judger.findDefinedSKU()
          const selectedTitle = judger.skuPending.returnSelectedCellTitle()
          const specNames = fenceGroup.fencesNames
          console.log(specNames)
          const isSelectFull = judger.skuPending.judgePendingFull()
          console.log(judger.skuPending)
          // 获取fg_fences的数组
          const fg_fences = fenceGroup.fences
          this.setData({
            defalutImg:defalutImg,
            defalutTitle:defalutTitle,
            fences: fg_fences,
            sku: sku,
            selectedTitle: selectedTitle,
            specNames: specNames,
            priceInterval: priceInterval,
            isSelectFull: isSelectFull
          })
        }
      }

    }
  },
  methods: {
    isHasSku (spu) {
      return spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0
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
      // console.log(judger.skuPending.returnSelectedCellTitle())
      // console.log(judger.skuPending.currentPath)
      const sku = judger.findDefinedSKU() === undefined ? null : judger.findDefinedSKU()
      const selectedTitle = judger.skuPending.returnSelectedCellTitle()
      console.log(selectedTitle)
      const isSelectFull = judger.skuPending.judgePendingFull()
      this.setData({
        fences: fg_fences_alter,
        sku: sku,
        selectedTitle: selectedTitle,
        isSelectFull: isSelectFull
      })
    }
  }
})
