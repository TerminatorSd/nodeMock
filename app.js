
"use strict"

var express             = require('express');
var app                 = express();
var bodyParse           = require('body-parser');
var cookieParser        = require('cookie-parser');

var jsonData = require('./data.json')

app.use(cookieParser());
app.use(bodyParse.urlencoded({extended:false}));
app.use(express.static('public'));

// 解决跨域问题
app.all('*',function (req, res, next) {
  console.log(req);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, authKey, sessionid');
  // res.header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, authKey, sessionId");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');


  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});

// mock 数据写法
// 获取注册用户列表
app.get('/user/list', function (req, res) {
  var result = {};
  result.data = jsonData.userList;
  result.errcode = 0;
  result.errmsg = '';
  res.end(JSON.stringify(result));
})

// 审核注册用户
app.post('/user/audit/1', function (req, res) {
  var result = {};
  result.data = jsonData.audit;
  result.errcode = 0;
  result.errmsg = '';
  res.end(JSON.stringify(result));
})

// 获取考试列表
app.get('/exam/getlist', function (req, res) {
  var result = {};
  result.data = jsonData.examList;
  result.errcode = 0;
  result.errmsg = '';
  res.end(JSON.stringify(result));
})

// 监听3000端口
var server=app.listen(3000, function () {
	console.log('listening at =====> http://127.0.0.1:3000...');
}) ;
