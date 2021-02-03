const Recipe = require('../models/Recipe')
const RecipeFile = require('../models/RecipeFile')

module.exports = {
  index(req, res) {
    try {
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

        return res.render('admin/recipes/list', { recipes: allRecipes })
      })
    } catch (error) {
      console.error(error)
    }
  },
  create(req, res) {
    try {
      Recipe.chefsSelectOptions(chefs => {
        const userId = req.session.userId
        return res.render('admin/recipes/create', { chefs, userId })
      })
      
    } catch (error) {
      console.error(error)
    }
  },
  show(req, res) {
    Recipe.find(req.params.id, async recipe => {
      const results = await Recipe.files(recipe.id)
      const files = results.rows.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
      }))

      return res.render('admin/recipes/detail', { recipe, files })
    })
  },
  edit(req, res) {
    Recipe.find(req.params.id, async recipe => {
      recipe.information = recipe.information.replace(/<br \/>/g, '\r\n')


      const results = await Recipe.files(recipe.id)
      const files = results.rows.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
      }))

      Recipe.chefsSelectOptions(chefs => {
        res.render('admin/recipes/edit', { recipe, chefs, files, userId: req.session.userId })
      })
    })
  },
  post(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
      if(req.body[key] == '' && key != 'removed_files' && key != 'information') {
        return Recipe.chefsSelectOptions(chefs => {
          res.render('admin/recipes/create', {
            chefs,
            userId: req.session.userId,
            error: 'Por favor, preencha todos os campos!',
            recipe: req.body
          })
        })
      }
    }

    if(req.files.length == 0) {
      return Recipe.chefsSelectOptions(chefs => {
        res.render('admin/recipes/create', {
          chefs,
          userId: req.session.userId,
          error: 'Por favor, envie pelo menos uma imagem!',
          recipe: req.body
        })
      })
    } else {
      Recipe.create(req, req.body, async recipe => {
        const filesPromise = req.files.map(file => RecipeFile.create({ ...file, recipe_id: recipe.id }))
        await Promise.all(filesPromise)
  
        return res.redirect(`/admin/recipes/${recipe.id}`)
      })
    }

  },
  async put(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
      if(req.body[key] == '' && key != 'removed_files' && key != 'information') {
        return res.send('Por favor, preencha todos os campos!')
      }
    }

    if(req.files.length != 0) {
      const newFilesPromise = req.files.map(file =>
        RecipeFile.create({...file, recipe_id: req.body.id}))

      await Promise.all(newFilesPromise)
    }

    if(req.body.removed_files) {
      const removedFiles = req.body.removed_files.split(',')
      const lastIndex = removedFiles.length - 1
      removedFiles.splice(lastIndex, 1)

      const removedFilesPromise = removedFiles.map(id => RecipeFile.delete(id))
      await Promise.all(removedFilesPromise)
    }

    Recipe.update(req.body, recipe => {
      return res.redirect(`/admin/recipes/${recipe.id}`)
    })
  },
  async delete(req, res) {
    try {
      let results = await Recipe.files(req.body.id)
      const files = results.rows
      const deletedFilesPromise = files.map(file => {
        RecipeFile.delete(file.id)
      })

      await Promise.all(deletedFilesPromise)
      Recipe.delete(req.body.id, () => {
      })

      return res.redirect('/admin/recipes')
    } catch (error) {
      console.error(error)
    }
  }
}