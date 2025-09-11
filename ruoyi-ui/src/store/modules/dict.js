// 初始化一个空数组来存储字典数据
const state = {
  dict: new Array()
}
//Mutations（状态变更）
const mutations = {
  SET_DICT: (state, { key, value }) => {
    if (key !== null && key !== "") {
      state.dict.push({
        key: key,
        value: value
      })
    }
  },
  REMOVE_DICT: (state, key) => {
    try {
      for (let i = 0; i < state.dict.length; i++) {
        if (state.dict[i].key == key) {
          state.dict.splice(i, 1)
          return true
        }
      }
    } catch (e) {
    }
  },
  CLEAN_DICT: (state) => {
    state.dict = new Array()
  }
}

/*异步操作。*/
const actions = {
  // 设置字典
  setDict({ commit }, data) {
    commit('SET_DICT', data)
  },
  // 删除字典
  removeDict({ commit }, key) {
    commit('REMOVE_DICT', key)
  },
  // 清空字典
  cleanDict({ commit }) {
    commit('CLEAN_DICT')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
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

