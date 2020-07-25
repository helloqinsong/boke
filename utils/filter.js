const jwt = require('jsonwebtoken');
const filterArr = ['/users/register','/users/login']; // 不需要token验证的请求

function noTokenCheck(url){ // 验证此接口是否需要token验证
    let len = filterArr.length;
    for(let i = 0; i < len; i++){
        if(url === filterArr[i]){
            return false;
        }
    }
    return true;
}

const filter = app => {
    app.use(async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', '*');// 解决跨域
        ctx.set('Access-Control-Allow-Headers', 'authorization');// 请求头
        let url = ctx.request.url; // 请求的url
        let token = ctx.request.header['authorization']; // 请求携带的token
        if(!noTokenCheck(url)){
            await next();
        } else {
            if(!token){
                ctx.body = {
                    code: 1006,
                    msg: 'token不存在或已失效,请重新登录',
                    data: null
                }
            } else {
                let time = jwt.verify(token,'secret').time; // token 的时间
                let currentTime = (new Date()).valueOf(); // 当前的时间
                if(currentTime > time){
                    ctx.body = {
                        code: 1004,
                        msg: 'token不存在或已失效,请重新登录',
                        data: null
                    }
                } else {
                    await next();
                }
            }
        }
    });
}
module.exports = filter
