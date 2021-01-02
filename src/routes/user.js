const express = require('express')
const routes = express.Router()

const UserController = require('../app/controllers/User')

routes.get('/register', UserController.registerForm)

routes.get('/', UserController.list)
routes.post('/', UserController.post)
routes.put('/', UserController.put)
routes.delete('/', UserController.delete)

module.exports = routes