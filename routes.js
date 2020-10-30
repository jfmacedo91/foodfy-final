const express = require('express')
const routes = express.Router()

const recipes = require('./data')

const RecipesController = require('./controllers/Recipes')

routes.get('/', (req, res) => {
  return res.render('home/index', { recipes })
})
routes.get('/about', (req, res) => {
  return res.render('home/about')
})
routes.get('/recipes', (req, res) => {
  return res.render('home/recipes', { recipes })
})
routes.get('/recipes/:index', (req, res) => {
  const index = req.params.index;
  const recipe = recipes[index]

  res.render('home/recipe', { recipe })
})

routes.get('/admin/recipes', RecipesController.index)
routes.get('/admin/recipes/create', RecipesController.create)
routes.get('/admin/recipes/:id', RecipesController.show)
routes.get('/admin/recipes/:id/edit', RecipesController.edit)

routes.post('/admin/recipes', RecipesController.post)
// routes.put('/admin/recipes', RecipesController.put)
// routes.delete('/admin/recipes', RecipesController.delete)

module.exports = routes