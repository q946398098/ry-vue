export default {
  install(Vue,options) {
    Vue.mixin({
      beforeCreate() {
        if (this.$options.ceshi) {
          this.$ceshi = this.$options.ceshi
        }
      }
    })
  }
}
