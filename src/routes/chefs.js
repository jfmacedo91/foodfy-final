const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const ChefsController = require('../app/controllers/Chefs')

const { onlyUsers } = require('../app/middlewares/session')

routes.get('/', onlyUsers, ChefsController.index)
routes.get('/create', onlyUsers, ChefsController.create)
routes.get('/:id', onlyUsers, ChefsController.show)
routes.get('/:id/edit', onlyUsers, ChefsController.edit)

routes.post('/', onlyUsers, multer.array('photo', 1), ChefsController.post)
routes.put('/', onlyUsers, multer.array('photo', 1), ChefsController.put)
routes.delete('/', onlyUsers, ChefsController.delete)

module.exports = routes