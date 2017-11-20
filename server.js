//  1、加载express
var express = require('express');

// 2、实例化

// 加载pass
var path = require('path');
var config = require('./config');
var router = require('./router');
var bodyParser = require('body-parser');
// var  myBodyParser = require('./my-body-parser');
var app = express();

// 告诉浏览器目录
app.set('views',path.join(__dirname,'./htmls'))
// 创建自定义模板
app.engine('html',require('ejs').renderFile);
// 使用html模板引擎
app.set('view engine','html')

app.use(bodyParser.urlencoded({extended:false}))

// 3、挂载路由
app.use(router);

// 配置body-bodyParser

app.listen(config,function () {
    console.log(`服务器开启了, http://localhost:${ config.port }`)
  })