const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')

const schema = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    authorid: Sequelize.INTEGER,
    posterid: Sequelize.INTEGER,
    artId: Sequelize.INTEGER,
    content: Sequelize.TEXT,

}

class Comment extends Model { }

Comment.init(schema,{
    sequelize,
    tableName:'blog_comment'
})

module.exports = { Comment }