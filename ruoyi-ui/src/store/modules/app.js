// 导入 js-cookie 库，用于在浏览器 Cookie 中持久化存储状态，这样用户刷新页面后状态不会丢失。
import Cookies from 'js-cookie'

/*定义状态*/
const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false,
    hide: false
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium'
}
// 3. Mutations（状态变更）
const mutations = {
  TOGGLE_SIDEBAR: state => {
    if (state.sidebar.hide) { //如果侧边栏被隐藏则不切换
      return false;
    }
    state.sidebar.opened = !state.sidebar.opened //展开收起状态栏
    state.sidebar.withoutAnimation = false //
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1) //z展开为1
    } else {
      Cookies.set('sidebarStatus', 0) //收起为0
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  SET_SIDEBAR_HIDE: (state, status) => {
    state.sidebar.hide = status
  }
}
//Actions（异步操作）
const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  toggleSideBarHide({ commit }, status) {
    commit('SET_SIDEBAR_HIDE', status)
  }
}


/*
export default {
  namespaced: true,   // 可选：启用命名空间
  state,              // 可选：状态
  getters,            // 可选：计算属性
  mutations,          // 可选：同步修改状态的方法
  actions,            // 可选：异步操作的方法
  modules             // 可选：嵌套子模块
}
*/

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
