const express = require('express')
const routes = express.Router()

const { recipes } = require('../../data.json')

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
routes.get('/chefs', (req, res) => {
  return res.render('site/chefs')
})

module.exports = routes