 /**
 * v-hasPermi 操作权限处理
 * Copyright (c) 2019 ruoyi
 */
/*获取存储的用户信息*/
import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    // 指令逻辑实现
    //从 binding 对象中解构出 value，即指令的值
    //v-hasPermi="['system:user:add']" 中的 ['system:user:add']
    const { value } = binding
    const all_permission = "*:*:*";
    const permissions = store.getters && store.getters.permissions

    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value

      //some() 是 JavaScript 数组的一个内置方法，用于测试数组中是否至少有一个元素满足指定条件。
      /*
      const all_permission = "*:*:*"
      //我有什么权限
      const permissions = ['system:user:list', 'system:user:add', 'system:role:list']
      //需要什么权限
      const permissionFlag = ['system:user:delete', 'system:user:edit']
      */
      const hasPermissions = permissions.some(permission => {
        return all_permission === permission || permissionFlag.includes(permission)
      })

      if (!hasPermissions) {
        //el - 这是应用指令的元素本身 。
        //el.parentNode - 这是元素的父节点 。
        //el.parentNode.removeChild(el) - 从父节点中移除该元素
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置操作权限标签值`)
    }
  }
}
