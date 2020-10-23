const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

server.use(express.static('public'))
server.set('view engine', 'njk')

nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true
})

server.get('/', (req, res) => {
  res.render('index.html')
})

server.get('/about', (req, res) => {
  res.render('about.html')
})

server.get('/recipes', (req, res) => {
  res.render('recipes.html')
})

server.listen(3333, () => {
  console.log('Server is running')
})