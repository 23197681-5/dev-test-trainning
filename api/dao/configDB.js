const {Sequelize}  = require("sequelize");

const sequelize = new Sequelize('pets', 'user', 'pass', {
    dialect: 'sqlite',
    host: './dev.sqlite'
})

module.exports = sequelize;
