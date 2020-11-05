const express = require('express')
const routes = express.Router()

const ChefsController = require('../app/controllers/Chefs')

routes.get('/', ChefsController.index)

module.exports = routes