const Recipe = require('../models/Recipe')

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
    Recipe.find(req.params.id, recipe => {
      recipe.information = recipe.information.replace(/<br \/>/g, '\r\n')

      Recipe.chefsSelectOptions(chefs => {
        res.render('admin/recipes/edit', { recipe, chefs })
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

    Recipe.create(req.body, recipe => {
      return res.redirect(`/admin/recipes/${recipe.id}`)
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
      if(req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos!')
      }
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