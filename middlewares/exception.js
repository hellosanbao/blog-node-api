const config = require('../config/config')

const catchError = async (ctx,next) =>{
     try{
         await next()
     }catch(error){
         const isHttpException = error instanceof HttpException
         const isDev = config.env = 'dev'
         if(isDev && !isHttpException){
             throw error
         }
         if(error instanceof HttpException){
             ctx.body = {
                 msg : error.msg,
                 errorCode:error.error_code,
                 reqestUrl:`${ctx.method} ${ctx.path}`
             }
             ctx.status = error.code
         }
         else{
             ctx.body = {
                 msg:'服务器未知错误',
                 error_code:-100,
                 reqestUrl:`${ctx.method} ${ctx.path}`
             }
             ctx.status = 500
         }
     }
}

module.exports = catchError