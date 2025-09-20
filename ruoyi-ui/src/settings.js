/*module export 是 node.js的内容，用于导出模块的内容
，让其他文件可用
// 可以导出任何类型的数据

// 导出对象
module.exports = { name: 'config' }

// 导出函数
module.exports = function() { return 'hello' }

// 导出类
module.exports = class MyClass {}

// 导出基本类型
module.exports = 'string value'


导出类型
1.默认导出
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
}
引入
import math from './math.js'
console.log(math.add(1, 2))



2.命名导出

module.exports.add = (a, b) => a + b
module.exports.subtract = (a, b) => a - b
module.exports.PI = 3.14159
引入
import { add, subtract, PI } from './utils.js'
console.log(add(1, 2))
console.log(PI)

3.混合导出

module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
}

module.exports.PI = 3.14159

引入
// 同时引入默认和命名导出
import calculator, { PI, version } from './calculator.js'
// 或者
import { default as calculator, PI, version } from './calculator.js'

console.log(calculator.add(1, 2))
console.log(PI)
console.log(version)


*/

module.exports = {
  /**
   * 侧边栏主题 深色主题theme-dark，浅色主题theme-light
   */
  sideTheme: 'theme-dark',

  /**
   * 是否系统布局配置
   */
  showSettings: false,

  /**
   * 是否显示顶部导航
   */
  topNav: false,

  /**
   * 是否显示 tagsView
   */
  tagsView: true,

  /**
   * 是否固定头部
   */
  fixedHeader: false,

  /**
   * 是否显示logo
   */
  sidebarLogo: true,

  /**
   * 是否显示动态标题
   */
  dynamicTitle: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production'
}
