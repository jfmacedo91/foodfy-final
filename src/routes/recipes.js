const express = require('express')
const routes = express.Router()

const RecipesController = require('../app/controllers/Recipes')

routes.get('/', RecipesController.index)
routes.get('/create', RecipesController.create)
routes.get('/:id', RecipesController.show)
routes.get('/:id/edit', RecipesController.edit)

routes.post('/', multer.array('photo', 3), RecipesController.post)
routes.put('/', multer.array('photo', 3), RecipesController.put)
routes.delete('/', RecipesController.delete)

module.exports = routes