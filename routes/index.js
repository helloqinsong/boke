const router = require('koa-router')();
const Mysql = require('../mysql');
const koaBody = require('koa-body');
const svgCode = require('../code/svgcode')


router.get('/', async (ctx, next) => {
  let sql = 'select * from user_info'
  let data = await Mysql.queryDataByMysql(sql);
  ctx.body = {
    code: 200,
    msg: 'ok',
    data: ctx.query
  }
})

router.post('/string', async (ctx, next) => {
  let response = ctx.request.body;
  ctx.body = {
    code: 200,
    msg: 'ok',
    data: response
  }
})

router.post('/upload',async (ctx, next) => {
  ctx.body = {
    code: 111,
  }
})
// 验证码
router.get('/code',async (ctx, next) => {
  let code = svgCode.getSvgCode();
  global.code = code.text.toLowerCase();
  ctx.body = {
    code: 200,
    data: code,
    msg: '获取成功',
    // text: ctx.session.codeText,
  }
})
// 获取初始化数据
router.get('/initData',async (ctx, next) => {
    let sql = 'select c_id as cId from c';
    let data = await Mysql.queryDataByMysql(sql);
    ctx.body = {
        code: 200,
        data,
        msg: '获取成功'
    }
})


module.exports = router;
