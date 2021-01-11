const express = require('express')
const routes = express.Router()

const UserController = require('../app/controllers/User')

const Validator = require('../app/validators/user')

routes.get('/register', UserController.registerForm)
routes.get('/:id/edit', UserController.editForm)

routes.get('/', UserController.list)
routes.post('/', Validator.post, UserController.post)
routes.put('/', UserController.put)
routes.delete('/', UserController.delete)

module.exports = routes