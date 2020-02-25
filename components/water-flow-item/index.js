Component({
  properties: {
    data: Object
  },
  data: {
    
  },

  attached() {
    // console.log(this.properties.data)
  },
  methods: {
    onTapping(event) {
      this.triggerEvent('tapping', {id:event.currentTarget.dataset.id}, {})
    }
  }
})