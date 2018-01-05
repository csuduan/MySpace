var path = require('path');
var router = require('express').Router();

// var Post = require('../models/post.js');
// var authRequired = require('../utils/auth-required');
// var User = require('../models/user.js');
// var Comment = require('../models/comment.js');
// require('mongoose-query-paginate');

router.get('/', function (req, res, next) {
    res.redirect('/blog')
});

router.get('/demo(/*)?', function (req, res, next) {
    console.log("/demo")
    var filename = path.join(compiler.outputPath,'demo.html');

    var file=compiler.outputFileSystem.readFileSync(filename)+"";
    res.set('content-type','text/html');
    res.send(file);
    res.end();
});


router.get('/blog(/*)?', function (req, res, next) {
    console.log("/blog"+" ")
    //res.sendFile(path.join(__dirname, '..','src/views/blog.html'));
    //res.render('auth/index',{name:'csuduan2'})
    var filename = path.join(compiler.outputPath,'blog.html');

    var file=compiler.outputFileSystem.readFileSync(filename)+"";
    res.set('content-type','text/html');
    res.send(file);
    res.end();
});

router.get('/qims(/*)?', function (req, res, next) {
    console.log("/qims")
    var filename = path.join(compiler.outputPath,'qims.html');

    var file=compiler.outputFileSystem.readFileSync(filename)+"";
    res.set('content-type','text/html');
    res.send(file);
    res.end();
});


//其他页面返回404
/*router.get('*', function (req, res, next) {

    res.status(404);
    res.render('error', {
        status:404,
        error: 'unkown error',
        stack: 'no stack info'
    });



});*/
/*router.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})

router.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        status:err.status || 500,
        error: err.message || err || 'unkown error',
        stack: err.stack || 'no stack info'
    });
})*/
module.exports = router;