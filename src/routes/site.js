const express = require('express')
const routes = express.Router()

const { recipes } = require('../../data.json')
const Chef = require('../app/models/Chef')

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
routes.get('/chefs',async (req, res) => {
  const results = await Chef.all()
  const chefs = results.rows

  return res.render('site/chefs', { chefs })
})

module.exports = routes