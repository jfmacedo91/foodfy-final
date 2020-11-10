const express = require('express')
const routes = express.Router()

const ChefsController = require('../app/controllers/Chefs')

routes.get('/', ChefsController.index)
routes.get('/create', ChefsController.create)
routes.get('/:id', ChefsController.show)

routes.post('/', ChefsController.post)

module.exports = routes