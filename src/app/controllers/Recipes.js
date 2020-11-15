const data = require('../../../data.json')
const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')

module.exports = {
  async index(req, res) {
    const recipesResults = await Recipe.all()
    const recipes = recipesResults.rows

    Chef.all(chefs => {
      return res.render('admin/recipes/list', { recipes, chefs })
    })
  },
  async create(req, res) {
    const results = await Chef.all()
    const chefs = results.rows

    return res.render('admin/recipes/create', { chefs })
  },
  async show(req, res) {
    const { id } = req.params
    const recipesResults = await Recipe.all()
    const recipes = recipesResults.rows
    const recipe = recipes[id-1]

    Chef.all(chefs => {
      return res.render('admin/recipes/detail', { recipe, chefs })
    })
  },
  edit(req, res) {
    const id = req.params.id;
    let recipe = data.recipes[id]
  
    recipe.information = recipe.information.replace(/<br \/>/g, '\r\n')
  
    res.render('admin/recipes/edit', { recipe, id })
  },
  async post(req, res) {
    await Recipe.create(req.body)
    const recipe = req.body

    console.log(recipe.id)
    return res.redirect(`/admin/recipes/${recipe.id}`)
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