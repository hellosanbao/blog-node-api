const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const { AppInit } = require('./core/init')

//中间件
const Exception = require('./middleware/exception')
const {paramValidator} = require('./middleware/paramValidator')

const app = new Koa()

app.use(bodyParser())
app.use(Exception)
app.use(paramValidator)

//初始化程序
AppInit.init(app)

app.listen(8080)