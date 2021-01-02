const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/Session')

routes.get('/login', SessionController.loginForm)
routes.get('/forgot-password', SessionController.forgotForm)
routes.get('/forgot-reset', SessionController.resetForm)

routes.post('/login', SessionController.login)
routes.post('/loguot', SessionController.logout)
routes.post('/forgot-password', SessionController.forgot)
routes.post('/forgot-reset', SessionController.reset)

module.exports = routes