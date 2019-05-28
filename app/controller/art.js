const Router = require('koa-router')
const { Art } = require('../model/art')
const router = new Router({
    prefix:'/art'
})

router.post('/post',async(ctx,next)=>{
    ctx.body = 'post art'
})

module.exports = router