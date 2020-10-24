const express = require('express')
const nunjucks = require('nunjucks')

const recipes = require('./data')

const server = express()

server.use(express.static('public'))
server.set('view engine', 'njk')

nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true
})

server.get('/', (req, res) => {
  res.render('index', { recipes })
})

server.get('/about', (req, res) => {
  res.render('about')
})

server.get('/recipes', (req, res) => {
  res.render('recipes', { recipes })
})

server.get('/recipes/:index', (req, res) => {
  const index = req.params.index;
  const recipe = recipes[index]

  res.render('recipe', { recipe })
})

server.listen(3333, () => {
  console.log('Server is running')
})