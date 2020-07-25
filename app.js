const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const multipart = require('koa-multipart')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser');// 获取post参数
const index = require('./routes/index');// 主控制层
const users = require('./routes/users');// 用户控制曾
const filter = require('./utils/filter');// 请求拦截
const sessions = require('./utils/session'); //seesion

filter(app); // 请求拦截，做统一处理
sessions(app); // 设置seesion

app.keys = ['some secret'];  /* cookie的签名 */




app.use(bodyParser());// 获取参数


onerror(app)

// middlewares
app.use(multipart()); // 解决post获取参数问题
app.use(json())
app.use(logger()) // 日志打印
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger

// routes 路由的使用
app.use(index.routes());
app.use(index.allowedMethods());
app.use(users.routes());
app.use(users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
