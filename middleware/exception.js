const config = require('../config')
const errorCodeMap = require('../core/util/errorCodeMap')
module.exports = async (ctx, next)=>{
    try {
        await next()
    } catch (error) {
        const isEnv = config.env === 'dev'
        const isCustomException = error instanceof CustomException

        if(isEnv && !isCustomException){
            throw error
        }
        if(isCustomException){
            ctx.body = {
                code:error.code,
                msg:error.msg,
                request:`${ctx.method}: ${ctx.path}`
            }
            ctx.status = error.status
        }else{
            ctx.body = {
                code:errorCodeMap.UNKONW_ERROR.code,
                msg:errorCodeMap.UNKONW_ERROR.msg,
                request:`${ctx.method}: ${ctx.path}`
            }
            ctx.status = 500
        }
    }
    
}