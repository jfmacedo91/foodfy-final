const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')

module.exports = {
  index(req, res) {
    Chef.all(chefs => {
      return res.render('admin/chefs/list', { chefs })
    })
  },
  create(req, res) {
    return res.render('admin/chefs/create')
  },
  show(req, res) {
    Chef.find(req.params.id, chef => {
      if(!chef) return res.send('Chef não encontrado!')

      Recipe.all(recipes => {
        return res.render('admin/chefs/show', { chef, recipes })
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

    Chef.create(req.body, chef => {
      return res.redirect(`/admin/chefs/${ chef.id }`)
    })
  },
  edit(req, res) {
    Chef.find(req.params.id, chef => {
      if(!chef) return res.send('Chef não encontrado!')

      return res.render('admin/chefs/edit', { chef })
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
      if(req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos!')
      }
    }

    Chef.update(req.body, () => {
      res.redirect(`/admin/chefs/${ req.body.id }`)
    })
  },
  delete(req, res) {
    Chef.delete(req.body.id, () => {
      res.redirect(`/admin/chefs`)
    })
  }
}