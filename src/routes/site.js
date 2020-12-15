const express = require('express')
const routes = express.Router()

const Site = require('../app/controllers/Site')

routes.get('/', Site.index)
routes.get('/about', Site.about)
routes.get('/recipes', Site.recipes)
routes.get('/recipes/search', Site.search)
routes.get('/recipes/:id', Site.recipe)
routes.get('/chefs', Site.chefs)

module.exports = routes