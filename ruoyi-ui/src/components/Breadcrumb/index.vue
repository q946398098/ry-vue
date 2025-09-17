<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      levelList: null,
    }
  },
  computed:{ //触发时机 , 依赖数据变化时自动重新计算 , 返回计算结果
    test(){
      return 'xxxxx'
    }
    //计算属性：基于 data 中的数据计算得出 。 返回计算结果。
    /*
    简写形式：只有 getter
    test(){

    }
    完整写法:
    fullName: {
     get() {
        return this.firstName + ' ' + this.lastName
    },
    set(newValue) {
      const names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }  */
  },
  // 作用：监听某个数据的变化 。 触发时机：被监听的数据变化时执行。用途：执行异步操作或复杂逻
  watch: {
    // 监听的是 Vue Router 的路由对象 , $route 是 Vue Router 提供的响应式路由对象 , 当路由发生变化时，$route 对象会自动更新
    // 以下操作都会触发 $route 监听器：
    // this.$router.push('/user/123')
    // this.$router.replace('/about')
    // $route(newVal, oldVal) {
    // 以下写法完全等价：
    // $route(route) { /!* ... *!/ },           // 只关心新值
    // $route(newRoute, oldRoute) { /!* ... *!/ }, // 新值和旧值都关心
    // $route(to, from) { /!* ... *!/ },        // Vue Router 官方推荐写法
    // $route(newValue, oldValue) { /!* ... *!/ }  // 通用写法
    //$route :function (new,old)
    //您看到的代码是 Vue 的响应式监听器语法，不是普通的方法定义。
    //
    /*watch: {
      // 监听的数据属性名
         数据名(新值, 旧值) {
          doSomething()
         }
    }*/
    $route :function (route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = []
      const router = this.$route
      const pathNum = this.findPathNum(router.path)
      // multi-level menu
      if (pathNum > 2) {
        const reg = /\/\w+/gi
        const pathList = router.path.match(reg).map((item, index) => {
          if (index !== 0) item = item.slice(1)
          return item
        })
        this.getMatched(pathList, this.$store.getters.defaultRoutes, matched)
      } else {
        matched = router.matched.filter(item => item.meta && item.meta.title)
      }
      // 判断是否为首页
      if (!this.isDashboard(matched[0])) {
        matched = [{ path: "/index", meta: { title: "首页" } }].concat(matched)
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    findPathNum(str, char = "/") {
      let index = str.indexOf(char)
      let num = 0
      while (index !== -1) {
        num++
        index = str.indexOf(char, index + 1)
      }
      return num
    },
    getMatched(pathList, routeList, matched) {
      let data = routeList.find(item => item.path == pathList[0] || (item.name += '').toLowerCase() == pathList[0])
      if (data) {
        matched.push(data)
        if (data.children && pathList.length) {
          pathList.shift()
          this.getMatched(pathList, data.children, matched)
        }
      }
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim() === 'Index'
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
