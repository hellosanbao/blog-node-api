const SendHelper = async (ctx,next)=>{

    //通用成功返回处理函数
    ctx.success = (msg,error_code) => {
        ctx.body={
            code:201,
            msg:msg || 'ok',
            error_code:error_code || 0
        }
    }
    await next()
}

module.exports = SendHelper