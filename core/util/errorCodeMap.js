const errorCodeMap = {
    UNKONW_ERROR:{
        code:-109,
        msg:'服务器未知错误'
    },
    PARAM_ERROR:{
        code:-104,
        msg:'参数错误'
    },
    TOKEN_EXPIRED:{
        code:-160,
        msg:'token过期'
    },
    TOKEN_ERROR:{
        code:-161,
        msg:'token错误'
    },
}

module.exports = errorCodeMap