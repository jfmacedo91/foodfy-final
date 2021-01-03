const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/Session')

routes.get('/login', SessionController.loginForm)
routes.get('/forgot-password', SessionController.forgotForm)
routes.get('/reset-password', SessionController.resetForm)

routes.post('/login', SessionController.login)
routes.post('/loguot', SessionController.logout)
routes.post('/forgot-password', SessionController.forgot)
routes.post('/reset-password', SessionController.reset)

module.exports = routes