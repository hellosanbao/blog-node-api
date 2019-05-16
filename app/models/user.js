const bcrypt = require('bcryptjs')
const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class User extends Model{

}

User.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,    //设为主键
        autoIncrement:true  //自动增长
    },
    nickname:Sequelize.STRING,
    password:{
        type:Sequelize.STRING,
        //每次模型操作该值得时候回先调用set方法
        set(val){
            const salt = bcrypt.genSaltSync(10)  //10指的是生成salt的成本，越高，安全性越高，性能消耗越大
            const psw = bcrypt.hashSync(val,salt)
            this.setDataValue('password',psw)
        }
    },
    phone:{
        type:Sequelize.BIGINT(11),
        unique:true
    },
    openid:{
        type:Sequelize.STRING(128),
        unique:true
    }
},{ sequelize,tableName:'island_user' })


module.exports = {
    User
}