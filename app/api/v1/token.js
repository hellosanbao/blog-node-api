const { TokenValidator } = require('../../lib/validators/validator')
module.exports = (Router)=>{
    const router = new Router({
        prefix:'/v1/token'
    })

    router.post('/',async (ctx)=>{
        const v = await new TokenValidator().validate(ctx)
        ctx.body = 123
    })

    return router
}