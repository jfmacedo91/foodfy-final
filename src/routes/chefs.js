const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const ChefsController = require('../app/controllers/Chefs')

const { onlyUsers, onlyAdmin } = require('../app/middlewares/session')

routes.get('/', onlyUsers, ChefsController.index)
routes.get('/create', onlyUsers, onlyAdmin, ChefsController.create)
routes.get('/:id', onlyUsers, ChefsController.show)
routes.get('/:id/edit', onlyUsers, onlyAdmin, ChefsController.edit)

routes.post('/', onlyUsers, onlyAdmin, multer.array('photo', 1), ChefsController.post)
routes.put('/', onlyUsers, onlyAdmin, multer.array('photo', 1), ChefsController.put)
routes.delete('/', onlyUsers, onlyAdmin, ChefsController.delete)

module.exports = routes