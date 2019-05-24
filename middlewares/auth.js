const jwt = require('jsonwebtoken')
const config = require('../config/config')

class Auth{
    constructor(){
    }
    get m(){
        return async(ctx,next)=>{
            //token检测
            const userToken = ctx.request.header._tk
            let decode = null
            if(!userToken){
                throw new Forbbiden('用户token错误')
            }
            try {
                decode = jwt.verify(userToken,config.security.secretKey)
            } catch (error) {
                if(error.name == 'TokenExpiredError'){
                    throw new Forbbiden('用户token过期')
                }
                throw new Forbbiden('用户token错误')
            }
            ctx.auth = {
                uid:decode.uid,
                scope:decode.scope
            }

            await next()
        }
    }
    static verifyToken(token){
        try {
            jwt.verify(token,config.security.secretKey)
            return true
        } catch (error) {
            return false
        }
        
    }
}

module.exports = {
    Auth
}