const { TokenValidator } = require('../../lib/validators/validator')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')
const { generateToken } = require('../../../core/util')
const { WXManager } = require('../../service/wx')

module.exports = (Router) => {
    const router = new Router({
        prefix: '/v1/token'
    })

    router.post('/', async (ctx) => {
        const v = await new TokenValidator().validate(ctx)
        const { account, password, type } = v.get('body')
        let token = ''
        //登录方式
        switch (type) {
            //手机号登录
            case LoginType.USER_MOBILE:
                token = await mobileLogin(account, password)
                break;
            //小程序登录
            case LoginType.USER_MINI_PROGRAM:
                token = await WXManager.codeToToken(account)
                break;
            default:
                break;
        }
        ctx.body = {token}
    })

    return router
}

async function mobileLogin(account, password) {
    const user = await User.verifyMobilePassword(account, password);
    return token = generateToken(user.id,2)
}