const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')

module.exports = {
  async index(req, res) {
    try {
      const recipes = await Recipe.findAll()

      async function getImage(recipeId) {
        let files = await Recipe.files(recipeId)
        files = files.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`)
        return files[0]
      }

      const recipesPromise = recipes.map(async recipe => {
        recipe.image = await getImage(recipe.id)
        return recipe
      })

      const allRecipes = await Promise.all(recipesPromise)

      return res.render('site/index', { recipes: allRecipes })
    } catch (error) {
      console.error(error);
    }
  },
  about(req, res) {
    return res.render('site/about')
  },
  async recipes(req, res) {
    try {
      const recipes = await Recipe.findAll()

      async function getImage(recipeId) {
        let files = await Recipe.files(recipeId)
        files = files.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`)
        return files[0]
      }

      const recipesPromise = recipes.map(async recipe => {
        recipe.image = await getImage(recipe.id)
        return recipe
      })
  
      const allRecipes = await Promise.all(recipesPromise)
  
      return res.render('site/recipes', { recipes: allRecipes })
    } catch (error) {
      console.error(error);
    }
  },
  async recipe(req, res) {
    try {
      const recipe = await Recipe.findOne(req.params.id)

      let files = await Recipe.files(recipe.id)
      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
      }))

      res.render('site/recipe', { recipe, files })
    } catch (error) {
      console.error(error);
    }
  },
  async chefs(req, res) {
    const chefs = await Chef.findAll()

    async function getImage(chefId) {
      let files = await Chef.files(chefId)
      files = files.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`)
      return files[0]
    }

    const chefsPromise = chefs.map(async chef => {
      chef.avatar_url = await getImage(chef.id)
      return chef
    })

    const allChefs = await Promise.all(chefsPromise)

    return res.render('site/chefs', { chefs: allChefs })
  },
  async search(req, res) {
    const { filter } = req.query
  
    const recipes = await Recipe.findBy(filter)

    async function getImage(recipeId) {
      let files = await Recipe.files(recipeId)
      files = files.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`)
      return files[0]
    }

    const recipesPromise = recipes.map(async recipe => {
      recipe.image = await getImage(recipe.id)
      return recipe
    })

    const filteredRecipes = await Promise.all(recipesPromise)

    return res.render('site/search', { recipes: filteredRecipes, filter })
  }
}