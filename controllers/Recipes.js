const fs = require('fs')

const data = require('../data.json')

exports.index = (req, res) => {
  return res.render('admin/recipes', { recipes: data.recipes })
}
exports.create = (req, res) => {
  return res.render('admin/create')
}
exports.show = (req, res) => {
  const id = req.params.id;
  const recipe = data.recipes[id]

  res.render('admin/detail', { recipe, id })
}
exports.edit = (req, res) => {
  const id = req.params.id;
  let recipe = data.recipes[id]

  recipe.information = recipe.information.replace(/<br \/>/g, '\r\n')

  res.render('admin/edit', { recipe, id })
}
exports.post = (req, res) => {
  let {
    title,
    author,
    image,
    ingredients,
    preparation,
    information
  } = req.body

  information = information.replace(/\r\n/g, '<br />')

  data.recipes.push({
    image,
    title,
    author,
    ingredients,
    preparation,
    information
  })

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (error) => {
    if(error) return res.send('Write file error!')
  })

  return res.redirect('/admin/recipes')
}
exports.put = (req, res) => {
  let {
    id,
    title,
    author,
    image,
    ingredients,
    preparation,
    information
  } = req.body

  information = information.replace(/\r\n/g, '<br />')

  data.recipes[id] = ({
    image,
    title,
    author,
    ingredients,
    preparation,
    information
  })

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (error) => {
    if(error) return res.send('Write file error!')
  })

  return res.redirect('/admin/recipes')
}
exports.delete = (req, res) => {
  let { id } = req.body

  const filteredRecipes = data.recipes.filter(recipe => {
    return recipe != data.recipes[id]
  })

  data.recipes = filteredRecipes

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (error) => {
    if(error) return res.send('Write file error!')
  })

  return res.redirect('/admin/recipes')
}