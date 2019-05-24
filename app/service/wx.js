const axios = require('axios')
const config = require('../../config/config')
const { User } = require('../models/user')
const { generateToken } = require('../../core/util')
class WXManager{
    static async codeToToken(code){
        let res = await axios.get(config.wx.loginUrl,{
            params:{
                appid:config.wx.appid,
                secret:config.wx.appsecret,
                js_code:code,
                grant_type:'authorization_code'
            }
        })
        if(res.status !== 200){
            throw new AuthError('openId获取失败')
        }
        if(res.data.errcode){
            throw new AuthError(res.data+res.data.errcode)
        }

        let user = await User.getUserByOpenid(res.data.openid)
        if(!user){
           user = await User.creatByOpenid(res.data.openid)
        }
        return generateToken(user.id,2)
        
    }
}

module.exports = {
    WXManager
}