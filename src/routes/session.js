const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/Session')

const SessionValidator = require('../app/validators/session')

const { isLoggedRedirectToProfile } = require('../app/middlewares/session')

routes.get('/login', isLoggedRedirectToProfile, SessionController.loginForm)
routes.get('/forgot-password', SessionController.forgotForm)
routes.get('/reset-password', SessionController.resetForm)

routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)
routes.post('/forgot-password', SessionController.forgot)
routes.post('/reset-password', SessionController.reset)

module.exports = routes