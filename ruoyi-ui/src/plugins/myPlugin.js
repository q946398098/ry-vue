export default {
  install(Vue,options) {
    Vue.mixin({
      beforeCreate() {
        if (this.$options.test_myplugin) {
          this.test_myplugin = this.$options.test_myplugin
        }
      },
      data(){
        return {
          test_mixin_data: 'ceshihahahahahah'
        }
      }
    })
  }
}


/*Vue.mixin 是 Vue.js 提供的一个全局 API，用于全局混入（mixins）。
它允许你向所有 Vue 实例注入可复用的功能。



*/
