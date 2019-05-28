const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')
const schema = {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nickname:Sequelize.STRING,
    email:{
        type: Sequelize.STRING,
        unique:true
    },
    password: {
        type:Sequelize.STRING,
        set(val){
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val,salt)
            this.setDataValue('password',psw)
        }
    }
}

class User extends Model{}

User.init(schema,{
    sequelize,
    tableName:'blog_user'
})
module.exports = {
    User
}