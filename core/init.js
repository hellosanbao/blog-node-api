const Router = require('koa-router')
const requireDirectory = require('require-directory')

class initManager {
    static init(app) {
        //入口方法
        initManager.app = app
        //全局绑定异常类
        require('../core/http-exception')
        initManager._loadRouter()
    }

    static _loadRouter() {
        const apiDir = `${process.cwd()}/app/api`
        requireDirectory(module, apiDir, {
            visit: (mod) => {
                mod(Router)
                this.app.use(mod(Router).routes())
            }
        })
    }
}

module.exports = initManager