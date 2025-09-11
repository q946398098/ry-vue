import Vue from 'vue' //Vue: Vue 构造函数
import Vuex from 'vuex' //
//创建vuex module end
import app from './modules/app'
import dict from './modules/dict'
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import settings from './modules/settings'
//创建vuex module end
import getters from './getters' // 全局的 getter 函数
Vue.use(Vuex)

// 创建 Vuex Store 实例
//创建实例：创建一个新的 Vuex Store 实例
//配置整合：将所有模块、getters 等配置整合到一个统一的状态管理对象中
//初始化：初始化整个应用的状态管理系
//返回实例：返回一个配置完成的 Store 对象
const store = new Vuex.Store({
  /*// 模块化状态管理*/
  modules: {
    app, // 应用级状态（如加载状态、主题等）
    dict, // 字典数据（如下拉框选项）
    user, //用户信息（如用户资料、权限等）
    tagsView, //标签页视图（多页签管理）
    permission,//权限相关（菜单权限、按钮权限）
    settings // 系统设置（如界面设置）
  },
  /*全局计算函数 doubleCount: state => state.count * 2*/
  getters
});

export default store
