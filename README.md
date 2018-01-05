# To start
![aaa](https://raw.githubusercontent.com/csuduan/images/master/111.png)

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli)

本系统采用多页面方式（每个页面是个独立SPA） 整合多个子系统系统。

# 使用
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8081
npm run dev

# build for production with minification
npm run build

```

# 文件结构
```
|--build
|  |--server.js       -   服务端核心构建
|  |--dev-cliet.js    -   热重载相关
|  |
|--config             -   系统配置
|  |--dev.env.js
|  |--index.js 
|  |--prod.env.js 
|--models             -   数据库模型文件
|--src                -   客户端目录
|  |--api             -   外部api
|  |--dist            -   发布目录
|  |--images          -   图片
|  |--js              -   js
|  |--sytels          -   样式
|  |--uploads         -   上传
|  |--view            -   视图
|  |--routes          -   客户端路由
|  |--vuex            -   状态
|--packga.json        -   项目信息

```

# 第三方依赖
* express - http服务
* swig    - html模板引擎
* webpack - 模块打包工具（每次修改文件后都要webpack下）
* webpack-dev-server  静态资源服务器（只使用开发环境，可以看做一个小小Express服务器），会自动webpack
  http://donglegend.com/2016/08/24/webpack%E9%82%A3%E4%BA%9B%E4%BA%8B%E5%84%BF03/
  核心插件：
  * webpack-dev-middleware  自动编译
  * webpack-hot-middleware  自动刷新浏览器
* 

# 工作流程
启动node app.js
1.  webpack打包客户端js及相关资源
    * 针对每个entry配置打包：src/views/xxx/index.js -> src/dist/xxx.js (含所有依赖)     
    * HtmlWebpackPlugin生成的html,嵌入上生成的xxx.js
2.  装载配置
    设定静态资源文件路径 public
    指定服务端路由views为public/views(采用swig引擎，模板html中引用1中的打包后的js)
3.  加载服务端路由配置
4.  启动express
5.  浏览器    
    * 根据服务端路由返回1中生成的html（/ 根据实际情况重定向）
    * 执行hmtl中嵌入的js （js中包含完整的vue框架，后续执行vue路由）
  
# 功能介绍
1. 博客系统  http://localhost:3000/blog
   后台      http://localhost:3000/blog/admin
   
2. Demo系统  http://localhost:3000/demo

3. QIMS系统  http://localhost:3000/qims



# 参考     
https://github.com/JhonXY/my-blog
