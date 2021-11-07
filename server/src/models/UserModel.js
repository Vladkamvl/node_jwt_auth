const sequelize = require('../db/connection')
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    email: {type: DataTypes.STRING, required: true, unique: true},
    password: {type: DataTypes.STRING, required: true},
})

module.exports = User
