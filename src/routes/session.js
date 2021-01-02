const express = require('express')
const routes = express.Router()

const ProfileController = require('../app/controllers/Profile')
const UserController = require('../app/controllers/User')

routes.get('/admin/profile', ProfileController.index)
routes.put('/admin/profile', ProfileController.put)

routes.get('/admin/users', UserController.list)
routes.post('/admin/users', UserController.post)
routes.put('/admin/users', UserController.put)
routes.delete('/admin/users', UserController.delete)

module.exports = routes