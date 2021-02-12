const fs = require('fs')

const Chef = require('../models/Chef')
const ChefFile = require('../models/ChefFile')
const Recipe = require('../models/Recipe')

module.exports = {
  async index(req, res) {
    try {
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

      if(req.session.success) {
        res.render('admin/chefs/list', {
          chefs: allChefs,
          success: req.session.success
        })
        req.session.success = ''
        return
      }

      return res.render('admin/chefs/list', { chefs: allChefs })
    } catch (error) {
      console.error(error);
    }
  },
  create(req, res) {
    return res.render('admin/chefs/create')
  },
  async post(req, res) {
    try {
      const { name } = req.body
      const chefId = await Chef.create({ name })

      let { filename, path } = req.files[0]
      await ChefFile.create({
        name: filename,
        path,
        chef_id: chefId
      })

      req.session.success = 'Chef cadastrado com sucesso!'

      return res.redirect(`/admin/chefs`)
    } catch (error) {
      console.error(error);
    }
  },
  async show(req, res) {
    try {
      const chef = await Chef.findOne(req.params.id)
      if(!chef) return res.send('Chef não encontrado!')
        
      let files = await Chef.files(chef.id)
      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
      }))
  
      const chefRecipes = await Chef.chefRecipes(chef.id)
  
      async function getImage(recipeId) {
        let files = await Recipe.files(recipeId)
        files = files.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`)
        return files[0]
      }
  
      const recipesPromise = chefRecipes.map(async recipe => {
        recipe.image = await getImage(recipe.id)
        return recipe
      })
  
      const allRecipes = await Promise.all(recipesPromise)
  
      return res.render('admin/chefs/show', { chef, recipes: allRecipes, files })
    } catch (error) {
      console.error(error);
    }
  },
  async edit(req, res) {
    try {
      const chef = await Chef.findOne(req.params.id)
      if(!chef) return res.send('Chef não encontrado!')

      let files = await Chef.files(chef.id)
      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
      }))

      return res.render('admin/chefs/edit', { chef, files })
    } catch (error) {
      console.error(error);
    }
  },
  async put(req, res) {
    try {
      const { id, name, removed_files } = req.body
      await Chef.update( id, { name })

      if(req.files.length != 0) {
        const newFilesPromise = req.files.map(file =>
          ChefFile.create({
            name: file.filename,
            path: file.path,
            chef_id: id
          }))
        
        await Promise.all(newFilesPromise)
      }

      if(removed_files) {
        const removedFiles = removed_files.split(',')
        const lastIndex = removedFiles.length - 1
        removedFiles.splice(lastIndex, 1)
  
        const removedFilesPromise = removedFiles.map(async id => {
          ChefFile.delete(id)

          const file = await ChefFile.findOne({ where: { id } })
          if(file.path == 'public/images/chef-placeholder.png') {
            console.log('Placeholders não serão deletados');
          } else {
            fs.unlinkSync(file.path)
          }

          await Promise.all(removedFilesPromise)
        })
      }

      res.redirect(`/admin/chefs/${ id }`)
    } catch (error) {
      console.error(error);
    }
  },
  async delete(req, res) {
    try {
      const chef = await Chef.findOne(req.body.id)
      if(chef.total_recipes == 1) {
        res.send(`O chef não pode ser excluido, pois tem 1 receita cadastrada!`)
      } else if(chef.total_recipes > 1) {
        res.send(`O chef não pode ser excluido, pois tem ${chef.total_recipes} receitas cadastradas!`)
      } else {
        await Chef.delete(chef.id)

        const chefFile = await Chef.files(chef.id)
        
        const file = await ChefFile.findOne({ where: { id: chefFile[0].id } })
        if(file.path == 'public/images/chef-placeholder.png') {
          console.log('Placeholders não serão deletados');
        } else {
          ChefFile.delete(chefFile[0].id)
          fs.unlinkSync(file.path)
        }
      }

      req.session.success = 'Chef Excluído com sucesso!'

      res.redirect(`/admin/chefs`)
    } catch (error) {
      console.error(error);
    }
  }
}