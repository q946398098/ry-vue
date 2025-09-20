import store from '@/store'
import router from '@/router';


/**
 * 刷新当前标签页
 * 关闭和打开标签页
 * 管理多个标签页的批量操作
 *
 * store.dispatch 是 Vuex Store 实例的一个方法，
 * 用于分发（触发）actions。
 * 让我详细解释：‘
 // 方式1：字符串 + 负载参数
 store.dispatch('tagsView/delView', router.currentRoute);

 // 方式2：对象形式
 store.dispatch({
 type: 'tagsView/delView',
 payload: router.currentRoute
 });

 // Vuex 内部会：
 // 1. 解析 action 名称 'tagsView/delView'
 // 2. 找到对应的 action 处理函数
 // 3. 执行该 action 函数
 // 4. 返回 Promise（因为 actions 是异步的）

 / Vuex 内部查找
 // namespace: 'tagsView'
 // actionName: 'delView'

 *
 */
export default {
  // 刷新当前tab页签
  refreshPage(obj) {
    const { path, query, matched } = router.currentRoute;
    if (obj === undefined) {
      matched.forEach((m) => {
        if (m.components && m.components.default && m.components.default.name) {
          if (!['Layout', 'ParentView'].includes(m.components.default.name)) {
            obj = { name: m.components.default.name, path: path, query: query };
          }
        }
      });
    }
    // 删除缓存视图，然后重定向到刷新页面
    return store.dispatch('tagsView/delCachedView', obj).then(() => {
      const { path, query } = obj
      router.replace({
        path: '/redirect' + path,
        query: query
      })
    })
  },
  // 关闭当前tab页签，打开新页签
  closeOpenPage(obj) {
    // 删除当前视图
    store.dispatch("tagsView/delView", router.currentRoute);
    if (obj !== undefined) {
      return router.push(obj);
    }
  },
  // 关闭指定tab页签
  closePage(obj) {
    if (obj === undefined) {
      return store.dispatch('tagsView/delView', router.currentRoute).then(({ visitedViews }) => {
        //寻找最后一个访问的视图
        //splice会修改元对象
        //用于截取一部分元素 / 字符并返回新的数组 / 字符串（不会修改原对象）
        //array.slice(startIndex[, endIndex])
        //
        const latestView = visitedViews.slice(-1)[0]
        if (latestView) {
          return router.push(latestView.fullPath)
        }
        return router.push('/');
      });
    }
    return store.dispatch('tagsView/delView', obj);
  },
  // 关闭所有tab页签
  closeAllPage() {
    return store.dispatch('tagsView/delAllViews');
  },
  // 关闭左侧tab页签
  closeLeftPage(obj) {
    return store.dispatch('tagsView/delLeftTags', obj || router.currentRoute);
  },
  // 关闭右侧tab页签
  closeRightPage(obj) {
    return store.dispatch('tagsView/delRightTags', obj || router.currentRoute);
  },
  // 关闭其他tab页签
  closeOtherPage(obj) {
    return store.dispatch('tagsView/delOthersViews', obj || router.currentRoute);
  },
  // 添加tab页签
  openPage(title, url, params) {
    const obj = { path: url, meta: { title: title } }
    store.dispatch('tagsView/addView', obj);
    return router.push({ path: url, query: params });
  },
  // 修改tab页签
  updatePage(obj) {
    return store.dispatch('tagsView/updateVisitedView', obj);
  }
}
