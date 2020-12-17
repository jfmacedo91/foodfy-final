const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')

module.exports = {
  index(req, res) {
    Recipe.all(async recipes => {
      async function getImage(recipeId) {
        const results = await Recipe.files(recipeId)
        const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`)
        return files[0]
      }

      const recipesPromise = recipes.map(async recipe => {
        recipe.image = await getImage(recipe.id)
        return recipe
      })

      const allRecipes = await Promise.all(recipesPromise)

      return res.render('site/index', { recipes: allRecipes })
    })
  },
  about(req, res) {
    return res.render('site/about')
  },
  recipes(req, res) {
    Recipe.all(async recipes => {
      async function getImage(recipeId) {
        const results = await Recipe.files(recipeId)
        const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`)
        return files[0]
      }

      const recipesPromise = recipes.map(async recipe => {
        recipe.image = await getImage(recipe.id)
        return recipe
      })

      const allRecipes = await Promise.all(recipesPromise)

      return res.render('site/recipes', { recipes: allRecipes })
    })
  },
  recipe(req, res) {
    Recipe.find(req.params.id, async recipe => {
      const results = await Recipe.files(recipe.id)
      const files = results.rows.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
      }))

      res.render('site/recipe', { recipe, files })
    })
  },
  search(req, res) {
    const { filter } = req.query
  
    Recipe.findBy(filter, async recipes => {
      async function getImage(recipeId) {
        const results = await Recipe.files(recipeId)
        const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`)
        return files[0]
      }

      const recipesPromise = recipes.map(async recipe => {
        recipe.image = await getImage(recipe.id)
        return recipe
      })

      const allRecipes = await Promise.all(recipesPromise)

      return res.render('site/search', { recipes: allRecipes, filter })
    })
  },
  chefs(req, res) {
    Chef.all(async chefs => {
      async function getImage(chefId) {
        const results = await Chef.files(chefId)
        const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`)
        return files[0]
      }

      const chefsPromise = chefs.map(async chef => {
        chef.avatar_url = await getImage(chef.id)
        return chef
      })

      const allChefs = await Promise.all(chefsPromise)

      return res.render('site/chefs', { chefs: allChefs })
    })
  }
}