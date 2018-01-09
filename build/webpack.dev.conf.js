var utils = require('./loader')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
    },
    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        /*new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                warnings: false
            }
        }),*/

        //注：动态生成的html在内存中，服务端路由无法直接访问
        new HtmlWebpackPlugin({
            filename: 'blog.html',
            template: './src/views/index.html',
            title:'我的博客',
            hash: true,
            inject: true,
            chunks: ['blog']
        }),
        new HtmlWebpackPlugin({
            filename: 'demo.html',
            template: './src/views/index.html',
            title:'Demo',
            hash: true,
            inject: true,
            chunks: ['demo']
        }),
        new HtmlWebpackPlugin({
            filename: 'qims.html',
            template: './src/views/index.html',
            title:'信息管理系统',
            hash: true,
            inject: true,
            chunks: ['qims']
        }),


        new FriendlyErrorsPlugin()
    ]
})


/*
demo
plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
     new HtmlWebpackPlugin({
      filename:'./pages/boys/index.html', //指定生成的html存放路径
      template:'./src/pages/boys/index.html', //指定html模板路径
      inject: true, //是否将js等注入页面,以及指定注入的位置'head'或'body'
      chunks:['pages/boys/index'] //需要引入的chunk(模块资源)，不配置就会引入所有页面的资源(js/css),这是个很重要的属性，你可以不配置试试效果
    }),
    new HtmlWebpackPlugin({
      filename:'./pages/goods/index.html',
      template:'./src/pages/goods/index.html',
      inject: true,
      chunks:['pages/goods/index']
    }),
    new HtmlWebpackPlugin({
      filename:'./pages/index/index.html',
      template:'./src/pages/index/index.html',
      inject: true,
      chunks:['pages/index/index']
    }),
    new HtmlWebpackPlugin({
      filename:'./pages/sotho/index.html',
      template:'./src/pages/sotho/index.html',
      inject: true,
      chunks:['pages/sotho/index']
    }),
   ...
  ]

 */
