const { RegisterValidator,NotEmptyValidator } = require('../../lib/validators/validator')
const { User } = require('../../models/user')
const { Auth } = require('../../../middlewares/auth')
module.exports = (Router) => {
    const router = new Router({
        prefix: '/v1/user'
    })

    /**
     * @api /v1/user/register  注册
     * 
     * @param { int } phone 注册手机号
     * @param { string } password 注册密码
     * @param { string } repassword  确认密码
     * @param { string } [nickname] 用户昵称
     * 
     */
    router.post('/register', async (ctx) => {
        //接受参数 validator
        const v = await new RegisterValidator().validate(ctx)
        const { phone, password, nickname } = v.get('body')
        const user = { phone, password, nickname }
        const res = await User.create(user)
        ctx.success()
    })

    /**
     * 测试api
     */
    router.post('/latest',new Auth().m, async(ctx,next)=>{
        ctx.body = ctx.auth
    })
    /**
     * 测试api
     */
    router.post('/verify', async(ctx,next)=>{
        const v = await new NotEmptyValidator().validate(ctx)
        const { token } = v.get('body')
        const ver = Auth.verifyToken(token)
        ctx.body = {
            ver
        }
    })

    return router
}