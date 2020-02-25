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
        // console.log(spu)
        const fenceGroup = new FenceGroup(spu)
        fenceGroup.init()
        // 获取fg_fences的数组
        // const fg_fences = fenceGroup.fences
        // console.log(fg_fences)
        // 保存fenceGroup对象
        const judger = new Judger(fenceGroup)
        // 赋值data对象
        this.data.judger = judger
        // 获取所有可能结果
        // console.log(judger.pathDict)
        judger.initDefalutSku()
        // 获取fg_fences的数组
        const fg_fences = fenceGroup.fences
        console.log(fenceGroup.skuList)
        console.log(judger.skuPending.returnSelectedCellTitle())
        console.log(judger.skuPending.pending)
        judger.findDefinedSKU()

        this.setData({
          fences: fg_fences
        })
      }
    }
  },
  methods: {
    onCellTap (event) {
      const detail = event.detail
      const cell = detail.cell
      const x = detail.x
      const y = detail.y
      const judger = this.data.judger
      // console.log(cell)
      // 选中时候 判断所有潜在路径是否可选的状态 再返回给页面展示
      judger.judgeAllStatus(cell, x, y)
      //引用类型 更新data的fences即可
      const fg_fences_alter = judger.fenceGroup.fences
      console.log(judger.skuPending.returnSelectedCellTitle())
      this.setData({
        fences:fg_fences_alter
      })
    }
  }
})
