const { RegisterValidator } = require('../../lib/validators/validator')
const { User } = require('../../models/user')
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
        const user = {
            phone: v.get('body.phone'),
            password: v.get('body.password'),
            nickname: v.get('body.nickname')
        }
        const res = await User.create(user)
        ctx.success()
    })

    return router
}