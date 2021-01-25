const express = require('express')
const routes = express.Router()

const UserController = require('../app/controllers/User')
const ProfileController = require('../app/controllers/Profile')

const UserValidator = require('../app/validators/user')

const { onlyUsers, onlyAdmin } = require('../app/middlewares/session')

routes.get('/profile', onlyUsers, UserValidator.profile, ProfileController.index)
routes.put('/profile', onlyUsers, UserValidator.update, ProfileController.put)

routes.get('/register', onlyUsers, onlyAdmin, UserController.registerForm)
routes.get('/:id/edit', onlyUsers, onlyAdmin, UserValidator.edit, UserController.editForm)

routes.get('/', onlyUsers, UserController.list)
routes.post('/', onlyUsers, onlyAdmin, UserValidator.post, UserController.post)
routes.put('/', onlyUsers, onlyAdmin, UserValidator.put, UserController.put)
routes.delete('/', onlyUsers, onlyAdmin, UserValidator.del, UserController.delete)

module.exports = routes