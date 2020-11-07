const fs = require('fs')

const data = require('../../../data.json')
const Recipe = require('../models/Recipe')

module.exports = {
  index(req, res) {
    return res.render('admin/recipes/list', { recipes: data.recipes })
  },
  create(req, res) {
    return res.render('admin/recipes/create')
  },
  show(req, res) {
    const id = req.params.id;
    const recipe = data.recipes[id]
  
    res.render('admin/recipes/detail', { recipe, id })
  },
  edit(req, res) {
    const id = req.params.id;
    let recipe = data.recipes[id]
  
    recipe.information = recipe.information.replace(/<br \/>/g, '\r\n')
  
    res.render('admin/recipes/edit', { recipe, id })
  },
  post(req, res) {
    Recipe.create(req.body, recipe => {
      return res.redirect(`/admin/recipes/${recipe.id}`)
    })
  },
  put(req, res) {
    let recipe = req.body
  
    information = recipe.information.replace(/\r\n/g, '<br />')
  
    data.recipes[recipe.id] = ({
      image: recipe.image,
      title: recipe.title,
      author: recipe.author,
      ingredients: recipe.ingredients,
      preparation: recipe.preparation,
      information
    })
  
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (error) => {
      if(error) return res.send('Write file error!')
    })
  
    return res.redirect('/admin/recipes')
  },
  delete(req, res) {
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
}