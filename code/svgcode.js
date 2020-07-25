const svgCaptcha = require('svg-captcha');

const getSvgCode = () =>  svgCaptcha.create({
    // 翻转颜色
    inverse: false,
    // 字体大小
    fontSize: 36,
    // 噪声线条数
    noise: 2,
    // 宽度
    width: 120,
    // 高度
    height: 60,
});
module.exports = {
    getSvgCode
}
