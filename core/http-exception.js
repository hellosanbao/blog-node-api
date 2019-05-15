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
