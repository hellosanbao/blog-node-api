const Sequelize = require('sequelize')
const {
    dbname,
    host,
    port,
    user,
    password
} = require('../config').db

const sequelize = new Sequelize(dbname, user, password, {
    dialect: 'mysql',
    host, port,
    // logging: true,
    timezone: '+08:00',
    define: {
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        freezeTableName: true
    }
})

sequelize.sync({
    force:true
})

module.exports = {
    sequelize
}