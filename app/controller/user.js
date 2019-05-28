const Router = require('koa-router')
const { get } = require('lodash')
const router = new Router()
const { generateToken, decodeToken } = require('../../core/util/jwt')
const { User } = require('../model/user')

router.post('/register', async (ctx, next) => {
    ctx.checkParam('body.nickname', [
        ctx.rule('isLength', '用户昵称在4~16位之间', { min: 4, max: 16 })
    ])
    ctx.checkParam('body.email', [
        ctx.rule('isEmail', '邮箱不合法')
    ])
    ctx.checkParam('body.password', [
        ctx.rule('isLength', '密码需要在6~16位之间', { min: 6, max: 16 })
    ])
    ctx.checkParam('body.repassword', [
        ctx.rule(checkRepassword, '两次密码不一致')
    ])
    function checkRepassword(val) {
        return val === get(ctx.request, 'body.password')
    }

    const token = generateToken({ uid: 123, scop: 2 })
    const decode = decodeToken(token)
    const { nickname, email, password } = ctx.request.body
    const user = { nickname, email, password }
    User.create(user)
    ctx.body = {
        token,
        decode
    }
})

module.exports = router