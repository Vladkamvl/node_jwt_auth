const jwt = require('jsonwebtoken')

const tokenModel = require('../models/TokenModel')

class TokenService{
    generateToken(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET,
                                {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET,
                                {expiresIn: '30d'})

        return {accessToken, refreshToken}
    }

    async saveToken(userId, refreshToken){
        const tokenData = await tokenModel.findOne({userId})
        if(tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await tokenModel.create({userId, refreshToken})
        return token
    }
    async removeToken(refreshToken){
        const tokenData = await tokenModel.destroy({where: {
                refreshToken
            }})
        return tokenData
    }
}

module.exports = new TokenService()