const bcrypt = require('bcryptjs')
const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

<<<<<<< Updated upstream
class User extends Model{

=======
class User extends Model {
    static async verifyMobilePassword(phone,password){
        const user = await this.findOne({
            where:{
                phone
            }
        })
        if(!user){
            throw new AuthError('用户不存在')
        }
        const correct = bcrypt.compareSync(password,user.password)
        if(!correct){
            throw new AuthError('密码不正确')
        }
        return user;
    }

    static async getUserByOpenid(openid){
        const user = await this.findOne({
            where:{
                openid
            }
        })
        return user
    }

    static async creatByOpenid(openid){
        return await this.create({
            openid
        })
    }
>>>>>>> Stashed changes
}

const secma = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,    //设为主键
        autoIncrement: true  //自动增长
    },
    nickname: Sequelize.STRING,
    password: {
        type: Sequelize.STRING,
        //每次模型操作该值得时候回先调用set方法
        set(val) {
            const salt = bcrypt.genSaltSync(10)  //10指的是生成salt的成本，越高，安全性越高，性能消耗越大
<<<<<<< Updated upstream
            const psw = bcrypt.hashSync(val,salt)
            this.setDataValue('password',psw)
=======
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue('password', psw)
>>>>>>> Stashed changes
        }
    },
    phone: {
        type: Sequelize.BIGINT(11),
        unique: true
    },
    openid: {
        type: Sequelize.STRING(128),
        unique: true
    }
}

User.init(secma, { sequelize, tableName: 'island_user' })


module.exports = {
    User
}