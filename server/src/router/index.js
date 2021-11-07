const Router = require('express').Router
const userController = require('../controllers/UserController')
const { body } = require('express-validator')

const router = new Router()

router.post('/registration',
    body('email').isEmail(),
    body('password').isString().isLength({min: 3, max: 32}),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

module.exports = router