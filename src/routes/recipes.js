const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const RecipesController = require('../app/controllers/Recipes')

const { onlyUsers } = require('../app/middlewares/session')

routes.get('/', onlyUsers, RecipesController.index)
routes.get('/create', onlyUsers, RecipesController.create)
routes.get('/:id', onlyUsers, RecipesController.show)
routes.get('/:id/edit', onlyUsers, RecipesController.edit)

routes.post('/', onlyUsers, multer.array('photo', 3), RecipesController.post)
routes.put('/', onlyUsers, multer.array('photo', 3), RecipesController.put)
routes.delete('/', onlyUsers, RecipesController.delete)

module.exports = routes