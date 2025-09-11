import Vue from 'vue'
/*
导入 Cookie 操作库：引入一个专门用于处理 Cookie 的第三方库
简化 Cookie 操作：提供简单易用的 API 来设置、获取、删除 Cookie
在项目中使用：主要用于保存用户的界面偏好设置（如 Element UI 组件尺寸）
提高开发效率：避免手写复杂的原生 Cookie 操作代码
*/
import Cookies from 'js-cookie'

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import App from './App'
//内部核心使用vuex
import store from './store'
import router from './router'
import directive from './directive' // directive
import plugins from './plugins' // plugins
import myPlugins from './plugins/myPlugin'
import { download } from '@/utils/request'

import './assets/icons' // icon
import './permission' // permission control
import { getDicts } from "@/api/system/dict/data";
import { getConfigKey } from "@/api/system/config";
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from "@/utils/ruoyi";

/*全局注册组件，方便项目调用*/
// 分页组件
import Pagination from "@/components/Pagination";
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar"
// 富文本组件
import Editor from "@/components/Editor"
// 文件上传组件
import FileUpload from "@/components/FileUpload"
// 图片上传组件
import ImageUpload from "@/components/ImageUpload"
// 图片预览组件
import ImagePreview from "@/components/ImagePreview"
// 字典标签组件
import DictTag from '@/components/DictTag'
// 头部标签组件
import VueMeta from 'vue-meta'
// 字典数据组件
import DictData from '@/components/DictData'

// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree

// 全局组件挂载
Vue.component('DictTag', DictTag)
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)
Vue.component('Editor', Editor)
Vue.component('FileUpload', FileUpload)
Vue.component('ImageUpload', ImageUpload)
Vue.component('ImagePreview', ImagePreview)


/*
import directive from './directive'  // 1. 加载模块，得到 install 函数
*/
Vue.use(directive) //该行会调用 directiveindex.js中导出的install
Vue.use(plugins)
DictData.install()

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

/*第一个参数是插件本身，该对象要带install方法，  第二个是选项，会传递给插件对象的intall方法*/
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false
Vue.use(myPlugins,a) // 没有这个是不识别这个属性a的，就是说不能挂在到vue节点上。

let a = {"a":"bbbb"}
window.Vue = Vue;
window.vue = new Vue({
  el: '#app', //挂在节点
  router, //路由
  store, //状态管理
  ceshi:a,
  render: h => h(App) // 渲染函数 。渲染 App 根组件
})


/*疑问解答
* new Vue({
  router,     // ✅ 支持
  store,      // ✅ 支持
  ceshi: a,   // ❌ Vue  可看源码，要this.option有这个参数他才会挂载上去
  render: h => h(App)
})
*
*
* */
