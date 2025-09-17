'use strict'
//路径解析
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}g

const CompressionPlugin = require('compression-webpack-plugin')

const name = process.env.VUE_APP_TITLE || '管理系统' // 网页标题

const port = process.env.port || process.env.npm_config_port || 80 // 端口

module.exports = {
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
  productionSourceMap: false,
  transpileDependencies: ['quill'],

  /*
  * 开发服务器配置 devServer
    端口动态获取（优先级：npm config > 环境变量 > 默认80）
    跨域代理配置，将process.env.VUE_APP_BASE_API路径代理到http://localhost:8080
    disableHostCheck: true允许任意主机访问
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


  //原始 Webpack 配置对象 . 添加新插件、覆盖配置 添加新插件、覆盖配置 , 后执行 相对（chainWebpack）
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
  //早（配置构建阶段) webpack-chain 链式 API 修改现有规则、添加 loader   , 先执行(相对configureWebpack)
  chainWebpack(config) {
    // 删除不需要的插件
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module //访问 Webpack 配置的 module 部分
      .rule('svg') // 获取名为 'svg' 的现有规则（Vue CLI 默认配置）
      .exclude.add(resolve('src/assets/icons')) //将 src/assets/icons 目录添加到排除列表
      .end() //结束当前规则修改，返回父级配置

    // 设置雪碧图加载
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
            .plugin('ScriptExtHtmlWebpackPlugin') //创建插件
            .after('html') //在 html-webpack-plugin 之后执行
            .use('script-ext-html-webpack-plugin', [{ //使用什么插件
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/ //将匹配的js内联到html里面
            }])
            .end()

          //这段代码是 Vue CLI 项目中代码分割（SplitChunks）的配置，用于优化生产环境构建结果
          //就是帮我们分类打包代码的工具，让网页加载更快
          //priority: 20 的 Element UI → 最先打包
          // priority: 10 的其他库 → 第二打包
          // priority: 5 的公共组件 → 最后打包
          config.optimization.splitChunks({
            chunks: 'all', //分割所有类型的 chunk（初始加载和异步加载
            cacheGroups: {
              libs: {
                name: 'chunk-libs',
                //把所有从 npm install 安装的库（如 Vue、Element UI）单独打包成 chunk-libs.js
                //这些库很少改动，单独打包后浏览器可以缓存，主包体积变小，加载更快
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
                minChunks: 3, //  minimum common number //minChunks: 3：仅当组件被引用 3 次及以上才分割
                priority: 5,
                reuseExistingChunk: true
              }
            }
          })
          config.optimization.runtimeChunk('single')
    })
  }
}

