const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')

const schema = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content:Sequelize.TEXT,
    author:Sequelize.INTEGER,
}

class Art extends Model {}

Art.init(schema,{
    sequelize,
    tableName:'blog_art'
})

module.exports = {
    Art
}