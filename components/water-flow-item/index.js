Component({
  properties: {
    data: Object
  },
  data: {},

  attached() {
    // console.log(this.properties.data)
  },
  methods: {
    onProduct(event) {
      console.log(event)
    }
  }
})