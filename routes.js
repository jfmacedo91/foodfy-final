const express = require('express')
const routes = express.Router()

const recipes = require('./data')

const RecipesController = require('./controllers/Recipes')

routes.get('/', (req, res) => {
  return res.render('index', { recipes })
})
routes.get('/about', (req, res) => {
  return res.render('about')
})
routes.get('/recipes', RecipesController.index)
routes.get('/recipes/:index', RecipesController.show)

module.exports = routes