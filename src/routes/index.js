const express = require('express')
const routes = express.Router()

const site = require('./site')
const recipes = require('./recipes')
const chefs = require('./chefs')
const session = require('./session')
const profile = require('./profile')
const user = require('./user')

routes.use(site)
routes.use('/admin/recipes', recipes)
routes.use('/admin/chefs', chefs)
routes.use('/session', session)
routes.use('/admin/profile', profile)
routes.use('/admin/user', user)

routes.get('/admin', (req, res) => {
  return res.redirect('/admin/recipes')
})

module.exports = routes