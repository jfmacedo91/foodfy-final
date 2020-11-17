const express = require('express')
const routes = express.Router()

const Recipe = require('../app/models/Recipe')
const Chef = require('../app/models/Chef')

routes.get('/', (req, res) => {
  Recipe.all(recipes => {
    return res.render('site/index', { recipes })
  })
})
routes.get('/about', (req, res) => {
  return res.render('site/about')
})
routes.get('/recipes', (req, res) => {
  Recipe.all(recipes => {
    return res.render('site/recipes', { recipes })
  })
})
routes.get('/recipes/:id', (req, res) => {
  Recipe.find(req.params.id, recipe => {
    res.render('site/recipe', { recipe })
  })
})
routes.get('/chefs', (req, res) => {
  Chef.all(chefs => {
    return res.render('site/chefs', { chefs })
  })
})

module.exports = routes