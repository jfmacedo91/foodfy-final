const express = require('express')
const routes = express.Router()

const UserController = require('../app/controllers/User')
const ProfileController = require('../app/controllers/Profile')

const UserValidator = require('../app/validators/user')

routes.get('/profile', UserValidator.profile, ProfileController.index)
routes.put('/profile', UserValidator.update, ProfileController.put)

routes.get('/register', UserController.registerForm)
routes.get('/:id/edit', UserValidator.edit, UserController.editForm)

routes.get('/', UserController.list)
routes.post('/', UserValidator.post, UserController.post)
routes.put('/', UserValidator.put, UserController.put)
routes.delete('/', UserController.delete)

module.exports = routes