const userService = require('../services/UserService')
const ApiError = require('../exceptions/ApiError')
const {validationResult} = require("express-validator");

class UserController{

    async registration(req, res, next){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации', errors))
            }
            const {email, password} = req.body
            const userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken,
                        {maxAge: 30*24*60*60*1000, httpOnly: true})

            return res.json(userData)
        }catch (e){
            next(e)
        }
    }

    async login(req, res, next){
        try{
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken,
                {maxAge: 30*24*60*60*1000, httpOnly: true})

            return res.json(userData.accessToken)
        }catch (e){
            next(e)
        }
    }

    async logout(req, res, next){
        try{
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        }catch (e){
            next(e)
        }
    }

}

module.exports = new UserController()