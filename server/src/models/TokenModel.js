const sequelize = require('../db/connection')
const {DataTypes} = require('sequelize');

const UserModel = require('./UserModel')

const Token = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    refreshToken: {type: DataTypes.STRING, required: true},
})
Token.belongsTo(UserModel)

module.exports = Token
