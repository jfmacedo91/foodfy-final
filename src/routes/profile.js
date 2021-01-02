const express = require('express')
const routes = express.Router()

const ProfileController = require('../app/controllers/Profile')

routes.get('/', ProfileController.index)
routes.put('/', ProfileController.put)

module.exports = routes