const Router = require('koa-router')
const { Comment } = require('../model/comment')
const router = new Router({
    prefix:'/comment'
})

router.post('/post',async(ctx,next)=>{
    ctx.body = 'post comment'
})

module.exports = router