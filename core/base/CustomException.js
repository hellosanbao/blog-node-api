const errorCodeMap = require('../util/errorCodeMap')
global.CustomException = class CustomException extends Error{
    constructor(msg='服务器内部错误',code=-109,status=500){
        super()
        this.code = code
        this.msg = msg
        this.status = status
    }
}

//参数错误
global.paramException = class paramException extends CustomException{
    constructor(){
        super()
        this.code = errorCodeMap.PARAM_ERROR.code
        this.msg = errorCodeMap.PARAM_ERROR.msg
        this.status = 400
    }
}

