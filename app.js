const Koa = require('koa')
const initManager = require('./core/init')
const bodyParser = require('koa-bodyparser')

//中间件
const catchError = require('./middlewares/exception')
const sendHelper = require('./middlewares/sendHelper')

const app = new Koa()

app.use(catchError)
app.use(sendHelper)
app.use(bodyParser())

//初始化程序
initManager.init(app)

app.listen(8080)