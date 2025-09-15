'use strict'


/*
*
* Vue CLI 项目核心配置文件
用于配置 Vue 项目的构建行为、开发服务器设置、Webpack 配置等
控制从开发环境到生产环境的编译、打包、部署全流程
*
*
* # Node.js 环境变量
process.env.NODE_ENV
*
*
* graph TD
    A[执行命令] --> B{命令类型}
    B --> |npm run serve| C[设置 NODE_ENV=development]
    B --> |npm run build| D[设置 NODE_ENV=production]
    B --> |npm run test| E[设置 NODE_ENV=test]
    *
    *
    * # 新建 .env.staging 文件
npm run serve --mode staging
*
* npm run build -- --modern --env.VUE_APP_API_URL=https://custom.api.com
*
*
*
* */

//路径解析
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
/**/

const CompressionPlugin = require('compression-webpack-plugin')

const name = process.env.VUE_APP_TITLE || '管理系统' // 网页标题

const port = process.env.port || process.env.npm_config_port || 80 // 端口

// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档

/*
* 基础配置
publicPath: 设置部署路径，生产/开发环境均使用根路径/
outputDir: 打包输出目录为dist
assetsDir: 静态资源存放路径static
lintOnSave: 开发环境启用 ESLint 检测
*
* */


/*cli 模式中
*
*  npm run serve 时，Vue CLI 自动设置 NODE_ENV=development
*
* npm run dev # 通常等价于 vue-cli-service serve
* 运行模式: development 模式
环境变量: 加载 .env.development 文件
默认行为: 启动 Vue 开发服务器（基于 Webpack Dev Serv
*
*
* */
module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: process.env.NODE_ENV === 'development',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  /*
  * productionSourceMap: false：关闭生产环境 Source Map
使用 CompressionPlugin 插件生成 GZIP 压缩文件
通过 chainWebpack 配置 SVG 雪碧图加载器
分包策略（SplitChunks）优化加载性能*/
  productionSourceMap: false,
  transpileDependencies: ['quill'],
  // webpack-dev-server 相关配置


  /*
  * 开发服务器配置 devServer
端口动态获取（优先级：npm config > 环境变量 > 默认80）
跨域代理配置，将process.env.VUE_APP_BASE_API路径代理到http://localhost:8080
disableHostCheck: true允许任意主机访问
*
* */
  devServer: {
    host: '0.0.0.0', //许局域网设备访问开发服务器
    port: port,
    open: true, //open: true 启动项目时自动打开浏览器
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: { //通过 [process.env.VUE_APP_BASE_API] 动态读取环境变量作为代理路径
        target: `http://localhost:8080`, //将请求代理到 http://localhost:8080 后端服务
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '' //pathRewrite 移除请求路径中的 API 前缀（例如 /api/user 会变成 /user）
        }
      }
    },
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: { outputStyle: "expanded" }
      }
    }
  },

  /*Webpack 配置扩展
配置路径别名 @ 指向 src 目录
通过 chainWebpack 移除默认的 preload/prefetch 插件*/
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      // http://doc.ruoyi.vip/ruoyi-vue/other/faq.html#使用gzip解压缩静态文件
      new CompressionPlugin({
        cache: false,                                  // 不启用文件缓存
        test: /\.(js|css|html|jpe?g|png|gif|svg)?$/i,  // 压缩文件格式
        filename: '[path][base].gz[query]',            // 压缩后的文件名
        algorithm: 'gzip',                             // 使用gzip压缩
        minRatio: 0.8,                                 // 压缩比例，小于 80% 的文件不会被压缩
        deleteOriginalAssets: false                    // 压缩后删除原文件
      })
    ],
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.when(process.env.NODE_ENV !== 'development', config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()

          config.optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial' // only package third parties that are initially dependent
              },
              elementUI: {
                name: 'chunk-elementUI', // split elementUI into a single package
                test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
                priority: 20 // the weight needs to be larger than libs and app or it will be packaged into libs or app
              },
              commons: {
                name: 'chunk-commons',
                test: resolve('src/components'), // can customize your rules
                minChunks: 3, //  minimum common number
                priority: 5,
                reuseExistingChunk: true
              }
            }
          })
          config.optimization.runtimeChunk('single')
    })
  }
}
