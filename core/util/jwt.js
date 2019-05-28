const jwt = require('jsonwebtoken')
const config = require('../../config')
const errorCodeMap = require('./errorCodeMap')
const generateToken = function(opt = {}){
    const secretKey = config.security.secretKey
    const expiresIn = config.security.expiresIn
    const token = jwt.sign(opt,secretKey,{expiresIn})
    return token
}

const decodeToken = function(token){
    const secretKey = config.security.secretKey
    let decode = false
    try {
        decode = jwt.verify(token,secretKey)
    } catch (error) {
        if(error.name == 'TokenExpiredError'){
            throw new CustomException(errorCodeMap.TOKEN_EXPIRED.msg,errorCodeMap.TOKEN_EXPIRED.code,403)
        }
        throw new CustomException(errorCodeMap.TOKEN_ERROR.msg,errorCodeMap.TOKEN_ERROR.code,403)
    }
    return decode
}


module.exports = {
    generateToken,
    decodeToken
}