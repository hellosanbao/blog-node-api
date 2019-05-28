const validator = require('validator')
const { isFunction } = require('lodash')
const { get } = require('lodash')
const errorCodemap = require('../core/util/errorCodeMap')

const paramValidator = async (ctx, next) => {
    let body = ctx.request.body
    let query = ctx.request.query
    ctx.rule = (...args) => args
    ctx.checkParam = (feild, rules, isOptional = '') => {
        //被校验参数需要是'body.'或者'query.'开头
        if (!feild.startsWith('body.') && !feild.startsWith('query.')) {
            throw new Error(`参数'${feild}'不是以"body."或者"query."开头`)
        }
        const feildData = get(ctx.request, feild) || ''
        //可传参数校验
        if (isOptional==='optional' && !feildData) {
            return true
        }
        for (let i = 0; i < rules.length; i++) {
            const item = rules[i];
            //校验规则函数，可支持自定义函数
            const validateFunction = isFunction(item[0]) ? item[0] : validator[item[0]]
            //校验规则必须是函数
            if (!isFunction(validateFunction)) {
                throw new Error(`校验函数不正确`)
            }
            //validator校验函数的参数
            const valideteParams = item.slice(2)
            //校验不通过的错误提示
            const validateMsg = '参数错误:' + item[1]
            let res = validateFunction(feildData, ...valideteParams)
            if (!res) {
                throw new CustomException(validateMsg, errorCodemap.PARAM_ERROR.code, 400)
            }
        }
    }
    await next()
}

module.exports = {
    paramValidator
}