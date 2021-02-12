const fs = require('fs')

const Recipe = require('../models/Recipe')
const RecipeFile = require('../models/RecipeFile')

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
  
      if(req.session.success) {
        res.render('admin/recipes/list', {
          recipes: allRecipes,
          success: req.session.success
        })
        req.session.success = ''
        return
      }

      return res.render('admin/recipes/list', { recipes: allRecipes })
    } catch (error) {
      console.error(error);
    }
  },
  async create(req, res) {
    try {
      const chefs = await Recipe.chefsSelectOptions()
      const userId = req.session.userId

      return res.render('admin/recipes/create', { chefs, userId })
    } catch (error) {
      console.error(error)
    }
  },
  async post(req, res) {
    try {
      let {
        title,
        chef_id,
        ingredients,
        preparation,
        information
      } = req.body

      information = information.replace(/\r\n/g, '<br />')

      const recipeId = await Recipe.create({
        title,
        chef_id,
        user_id: req.session.userId,
        ingredients,
        preparation,
        information
      })

      const filesPromise = req.files.map(async file => {
        RecipeFile.create({
          name: file.filename,
          path: file.path,
          recipe_id: recipeId
        })
      })

      await Promise.all(filesPromise)

      req.session.success = 'Recita cadastrada com sucesso!'

      return res.redirect(`/admin/recipes`)
    } catch (error) {
      console.error(error);
    }
  },
  async show(req, res) {
    const recipe = await Recipe.findOne(req.params.id)

    let files = await Recipe.files(recipe.id)
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    }))

    return res.render('admin/recipes/detail', { recipe, files })
  },
  async edit(req, res) {
    const recipe = await Recipe.findOne(req.params.id)
    const chefs = await Recipe.chefsSelectOptions()

    recipe.information = recipe.information.replace(/<br \/>/g, '\r\n')

    let files = await Recipe.files(recipe.id)
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    }))

    return res.render('admin/recipes/edit', { recipe, chefs, files})
  },
  async put(req, res) {
    try {
      let {
        id,
        title,
        chef_id,
        ingredients,
        preparation,
        information,
        removed_files
      } = req.body

      information = information.replace(/\r\n/g, '<br />')

      if(req.files.length != 0) {
        const newFilesPromise = req.files.map(async file => {
          RecipeFile.create({
            name: file.filename,
            path: file.path,
            recipe_id: id
          })
        })

        await Promise.all(newFilesPromise)
      }

      if(removed_files) {
        const removedFiles = removed_files.split(',')
        const lastIndex = removedFiles.length - 1
        removedFiles.splice(lastIndex, 1)

        const removedFilesPromise = removedFiles.map(async id => {
          RecipeFile.delete(id)

          const file = await RecipeFile.findOne({ where: { id } })
          if(file.path == 'public/images/recipe-placeholder.png') {
            console.log('Placeholders não serão deletados');
          } else {
            fs.unlinkSync(file.path)
          }
        })

        await Promise.all(removedFilesPromise)
      }

      await Recipe.update(id, {
        title,
        chef_id,
        ingredients,
        preparation,
        information
      })

      return res.redirect(`/admin/recipes/${id}`)
    } catch (error) {
      console.error(error);
    }
  },
  async delete(req, res) {
    try {
      let files = await Recipe.files(req.body.id)
      const deletedFilesPromise = files.map(file => {
        RecipeFile.delete(file.id)
        if(file.path == 'public/images/recipe-placeholder.png') {
          console.log('Placeholders não serão deletados');
        } else {
          fs.unlinkSync(file.path)
        }
      })

      await Promise.all(deletedFilesPromise)
      await Recipe.delete(req.body.id)

      req.session.success = 'Receita excluída com sucesso!'

      return res.redirect('/admin/recipes')
    } catch (error) {
      console.error(error)
    }
  }
}