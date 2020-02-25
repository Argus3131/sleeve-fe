Component({
  properties: {
    cell: Object,
    x: Number,
    y: Number
  },
  observers: {
    // "cells":function (cell) {
    //   if (cell){
    //     console.log(cell)
    //   }
    // }
  },
  data: {
    status: ''
  },
  methods: {
    onTapCell (event) {
      this.triggerEvent('cellTap'
        , {
          cell: this.properties.cell,
          x: this.properties.x,
          y: this.properties.y
        }, {
          bubbles: true,
          composed: true
        })
    }

  }
})
