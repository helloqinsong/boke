const router = require('koa-router')({
	prefix: '/users'
});
const Mysql = require('../mysql');
const jwt = require('jsonwebtoken');

router.post('/register', async function(ctx, next) {
	let response = ctx.request.body;
	if (response.code === '' || response.code !== global.code) {
		ctx.body = {
			code: 5001,
			msg: '验证码错误'
		}
	} else {
		let sql =
			`insert into user_info(name,email,password) values("${response.userName}","${response.userEmail}","${response.userPassword}")`
		let data = await Mysql.queryDataByMysql(sql);
		if (data.affectedRows > 0) {
			ctx.body = {
				code: 200,
				msg: 'ok',
				data: data
			}
		} else {
			ctx.body = {
				code: 500,
				msg: '后台数据报错',
			}
		}
	}
})
router.post('/login', async function(ctx, next) {
	let response = ctx.request.body;
	// 查询是否有此用户
	let sql = `select * from user_info where name="${response.userName}" and password="${response.password}"`
	let data = await Mysql.queryDataByMysql(sql);
	let obj = new Object();
	for(let key in data[0]){
		obj[key] = data[0][key]
  	}
	obj.time = (new Date()).valueOf() + 86400000;
	if(data.length > 0){
		const token = jwt.sign(obj, 'secret', {
			expiresIn: 3600
		});
		global.token = token;
		if(token){
			ctx.body = {
				code: 200,
				msg: '登录成功',
				token: token
			}
		} else {
			ctx.body = {
				code: 1001,
				msg: '登录失败',
			}
		}
	} else {
		ctx.body = {
			code: 1002,
			msg: '用户或密码不正确，请重新登录',
		}
	}
})
module.exports = router;
