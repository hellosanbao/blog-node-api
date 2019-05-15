const Sequelize = require('sequelize')
const {
    dbName,
    host,
    port,
    password,
    user
} = require('../config/config').database


const sequelize = new Sequelize(dbName, user, password,{
    dialect:'mysql',  //数据库类型
    host,             //数据库host
    port,              //数据库port
    timezone:'+08:00',  //时区
    logging:true,
    define:{
        timestamps:true,  //是否自动生成创建时间和更新时间creat_time update_time
        createdAt:'creat_time',
        updatedAt:'update_time',
        deletedAt:'delete_time',
        paranoid:true,  //是否自动生成删除时间
        underscored:true,  //将字段命名方式换成下划线连接
    }
})

sequelize.sync()

module.exports = {
    sequelize
}