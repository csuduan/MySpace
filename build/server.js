var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var swig=require('swig');
var multipart = require('connect-multiparty');
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')



//var authRequired = require('./utils/auth-required.js');
//var passport = require('passport');
var mongoose = require('mongoose');
var config = require('../config');
var proxyTable = config.dev.proxyTable

// mongoose setup

mongoose.connect(config.dev.mongodb);
mongoose.connection.on("connected", function () {
    console.log("MongoDB connect "+config.dev.mongodb+" success");
});
mongoose.connection.on("error", function () {
    console.log("MongoDB connect  "+config.dev.mongodb+" fail");
});
mongoose.connection.on("disconnected", function () {
    console.log("MongoDB connect disconnected");
});


// passport setup
//passport.use(User.createStrategy());
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());
var apiroute = require('./routes/api.js')



// 默认开发模式，生产模式待开发
var app = express();


// webpack webpack-dev-middleware和webpack-hot-middleware的静态资源服务只用于开发环境。
// 到了线上环境，应该使用express.static()。
//全局 compiler
compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})


var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

//静态资源
/app.use(express.static(path.join(__dirname, '..','src/dist')));
//app.use(express.static('public/dist'));



app.set('env', config.dev.env);
app.set('port', config.dev.port);

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})



//engine
app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views',path.join(__dirname, '..','src/views'));
swig.setDefaults({cache:false});

// handle fallback for HTML5 history API
//app.use(require('connect-history-api-fallback')())

app.use(favicon(__dirname + '/../src/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended: false}));
//app.use(multipart({uploadDir: __dirname + '/../public/uploads'}));
app.use(cookieParser());
//
// app.use(session({secret: 'hello! TMY', resave: true, saveUninitialized: true, cookie: { maxAge: 60000 }}));


//app.use(passport.initialize());
//app.use(passport.session());
//app.use(require('./utils/locals'));



// routes
app.use('/', require('./route'));

//api
apiroute(app)




var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))


console.log('> Starting myblog server...')

var _resolve
var readyPromise = new Promise(resolve => {
    _resolve = resolve
})


devMiddleware.waitUntilValid(() => {
    var uri = 'http://localhost:' + config.dev.port
    console.log('> Listening at ' + uri + '\n')
    _resolve()
})

var server = app.listen(app.get('port'))

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}


