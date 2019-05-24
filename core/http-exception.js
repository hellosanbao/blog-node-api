global.HttpException =  class HttpException extends Error {
    constructor(msg = '服务器内部错误',error_code = 1000, code = 500){
        super()
        this.error_code = error_code
        this.code = code
        this.msg = msg
    }
}

global.ParameterException = class ParameterException extends HttpException{
    constructor(msg, error_code){
        super()
        this.code = 400
        this.msg = msg[0] || '参数错误'
        this.error_code = error_code || 10000
    }
}

//用户相关验证
global.AuthError = class AuthError extends HttpException{
    constructor(msg, error_code){
        super()
        this.code = 200
        this.msg = msg || '授权失败'
        this.error_code = error_code || -160
    }
}

//禁止访问
global.Forbbiden = class Forbbiden extends HttpException{
    constructor(msg, error_code){
        super()
        this.code = 403
        this.msg = msg || '禁止访问'
        this.error_code = error_code || -360
    }
}
