const Recipe = require('../models/Recipe')
const RecipeFile = require('../models/RecipeFile')

module.exports = {
  index(req, res) {
    Recipe.all(recipes => {
      return res.render('admin/recipes/list', { recipes })
    })
  },
  create(req, res) {
    Recipe.chefsSelectOptions(chefs => {
      return res.render('admin/recipes/create', { chefs })
    })
  },
  show(req, res) {
    Recipe.find(req.params.id, recipe => {
      return res.render('admin/recipes/detail', { recipe })
    })
  },
  edit(req, res) {
    Recipe.find(req.params.id, async recipe => {
      recipe.information = recipe.information.replace(/<br \/>/g, '\r\n')


      let files = await Recipe.files(recipe.id)
      files = files.rows
      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
      }))

      Recipe.chefsSelectOptions(chefs => {
        res.render('admin/recipes/edit', { recipe, chefs, files })
      })
    })
  },
  post(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
      if(req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos!')
      }
    }

    if(req.files.length == 0)
      return res.send('Por favor, envie pelo menos uma imagem!')

    Recipe.create(req.body, async recipe => {
      const filesPromise = req.files.map(file => RecipeFile.create({ ...file, recipe_id: recipe.id }))
      await Promise.all(filesPromise)

      return res.redirect(`/admin/recipes/${recipe.id}`)
    })
  },
  async put(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
      if(req.body[key] == '' && key != 'removed_files') {
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
  delete(req, res) {
    Recipe.delete(req.body.id, () => {
      return res.redirect('/admin/recipes')
    })
  }
}