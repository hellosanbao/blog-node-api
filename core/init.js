/**
 * 引用初始化类
 * 做一些初始化操作
 */


const Router = require('koa-router')
const requireDirectory = require('require-directory')
const config = require('../config')

class AppInit {
    static init(app) {
        this.app = app
        this.initRouter()
        this.initException()
    }

    //加载路由
    static initRouter() {
        requireDirectory(module,`${config.root}/app/controller`,{
            visit:(router)=>{
                this.app.use(router.routes())
            }
        })
    }

    //初始化全局异常处理
    static initException(){
        require('../core/base/CustomException')
    }

}

module.exports = {
    AppInit
}