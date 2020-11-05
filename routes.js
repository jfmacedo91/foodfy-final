const express = require('express')
const routes = express.Router()

const { recipes } = require('./data.json')

const RecipesController = require('./controllers/Recipes')
const ChefsController = require('./controllers/Chefs')

routes.get('/', (req, res) => {
  return res.render('site/index', { recipes })
})
routes.get('/about', (req, res) => {
  return res.render('site/about')
})
routes.get('/recipes', (req, res) => {
  return res.render('site/recipes', { recipes })
})
routes.get('/recipes/:index', (req, res) => {
  const index = req.params.index;
  const recipe = recipes[index]

  res.render('site/recipe', { recipe })
})
routes.get('/chefs/list', (req, res) => {
  return res.render('site/chefs')
})

routes.get('/admin/recipes', RecipesController.index)
routes.get('/admin/recipes/create', RecipesController.create)
routes.get('/admin/recipes/:id', RecipesController.show)
routes.get('/admin/recipes/:id/edit', RecipesController.edit)

routes.post('/admin/recipes', RecipesController.post)
routes.put('/admin/recipes', RecipesController.put)
routes.delete('/admin/recipes', RecipesController.delete)

routes.get('/admin/chefs', ChefsController.index)

module.exports = routes