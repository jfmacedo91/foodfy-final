const Chef = require('../models/Chef')
const ChefFile = require('../models/ChefFile')

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

      Chef.chefRecipes(chef.id, recipes => {
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

    if(req.files.length == 0)
      return res.send('Por favor, envie pelo menos uma imagem!')

    Chef.create(req.body, async chef => {
      const filesPromise = req.files.map(file => ChefFile.create({ ...file, chef_id: chef.id }))
      await Promise.all(filesPromise)

      return res.redirect(`/admin/chefs/${ chef.id }`)
    })
  },
  edit(req, res) {
    Chef.find(req.params.id, async chef => {
      if(!chef) return res.send('Chef não encontrado!')

      let files = await Chef.files(chef.id)
      files = files.rows
      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
      }))

      return res.render('admin/chefs/edit', { chef, files })
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
        ChefFile.create({...file, id: req.body.id}))
      
      await Promise.all(newFilesPromise)
    }

    if(req.body.removed_files) {
      const removedFiles = req.body.removed_files.split(',')
      const lastIndex = removedFiles.length - 1
      removedFiles.splice(lastIndex, 1)

      const removedFilesPromise = removedFiles.map(id => ChefFile.delete(id))
      await Promise.all(removedFilesPromise)
    }

    Chef.update(req.body, () => {
      res.redirect(`/admin/chefs/${ req.body.id }`)
    })
  },
  delete(req, res) {
    Chef.find(req.body.id, chef => {
      if(chef.total_recipes == 1) {
        res.send(`O chef não pode ser excluido, pois tem 1 receita cadastrada!`)
      } else if(chef.total_recipes > 1) {
        res.send(`O chef não pode ser excluido, pois tem ${chef.total_recipes} receitas cadastradas!`)
      } else {
        Chef.delete(chef.id, () => {
          res.redirect(`/admin/chefs`)
        })
      }
    })
  }
}