const bcrypt = require('bcrypt')

const userModel = require('../models/UserModel')
const tokenService = require('./TokenService')
const UserDTO = require('../dtos/UserDTO')
const ApiError = require('../exceptions/ApiError')

class UserService{
    async registration(email, password){
        const candidate = await userModel.findOne({
                                            where: {
                                                email: email
                                            }})
        if(candidate){
            throw ApiError.BadRequest(`Пользователь с email = ${email}, уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await userModel.create({email, password: hashPassword})

        const userDTO = new UserDTO(user)
        const tokens = tokenService.generateToken({...userDTO})
        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDTO
        }
    }

    async login(email, password){
        const user = await userModel.findOne({
            where: {
                email: email
            }})
        if(!user){
            throw ApiError.BadRequest(`Пользователь с email = ${email}, не был найден`)
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){
            throw ApiError.BadRequest(`Неверный пароль`)
        }
        const userDTO = new UserDTO(user)
        const tokens = tokenService.generateToken({...userDTO})
        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDTO
        }
    }
    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)
        return token
    }
}

module.exports = new UserService()