var path = require('path')
var utils = require('./loader')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {

  //打包入口，非路由
  entry: {
      'blog':resolve('src/views/blog/index.js'),
      'demo':resolve('src/views/demo/index.js'),
      'qims':resolve('src/views/qims/index.js'),
},
  output: {
      path: config.build.assetsRoot,
      filename: '[name].js',
      publicPath: process.env.NODE_ENV === 'production'
          ? config.build.assetsPublicPath
          : config.dev.assetsPublicPath
  },
  resolve: {
    //root: __dirname,  //模块从里开始查找
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'scss_vars': '@/styles/vars.scss'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('public')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
