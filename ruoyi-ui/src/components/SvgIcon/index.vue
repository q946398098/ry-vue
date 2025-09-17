<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
<!--
      <button>
       <svg>🔍</svg> 搜索
      </button> 。 会读 按钮，搜索图标，搜索 。 重复读了

       button>
        <svg aria-hidden="true">🔍</svg> 搜索
      </button>
      这样的话就会读   按钮 ，搜索。
-->

  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <!--
       <use :xlink:href="iconName" />
       实际渲染为: <use xlink:href="#icon-search" />
       webpack 将 svg 都放到一个雪碧图里面去了。 所以可以访问 symbol
     -->
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { isExternal } from '@/utils/validate'

//Vue 的模板语法会自动查找组件实例上的属性或方法。 所以上面导入了这个完全不影响！！！！！！！
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  //computed 属性是惰性求值的，只有在以下情况下才会执行：
  //1.当组件首次渲染时，且该 computed 属性被访问（在模板中使用或在其他地方调用
  //2.当其依赖的响应式数据发生变化时
  //3.当 computed 属性被再次访问，且依赖数据已发生变化时
  computed: {
    isExternal() {
      return isExternal(this.iconClass)
    },
    iconName() {
      console.log(`#icon-${this.iconClass}`);
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    /*
      <!-- 在模板中通过 :style 绑定对象 -->
      <div :style="styleExternalIcon" />
      <div style="mask: url(icon-url) no-repeat 50% 50%; -webkit-mask: url(icon-url) no-repeat 50% 50%;" />
    */
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
