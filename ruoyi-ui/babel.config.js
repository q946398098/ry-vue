module.exports = {
  presets: [
    // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    '@vue/cli-plugin-babel/preset'
  ],
  'env': {
    'development': {
      // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
      // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
      'plugins': ['dynamic-import-node']
    }
  }
}

/*
babel.config.js 是 Babel 编译器的配置文件，主要用于：
将现代 JavaScript (ES6+) 代码转换为浏览器兼容的 JavaScript 语法
配置代码转换规则和插件
优化开发体验（如提高热更新速度）
*/
