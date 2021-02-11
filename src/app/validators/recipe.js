const Recipe = require('../models/Recipe')

async function checkAllFields(req) {
  const keys = Object.keys(req.body)

  for(key of keys) {
    if(req.body[key] == '' && key != 'removed_files' && key != 'information') {
      const chefs = await Recipe.chefsSelectOptions()
      return {
        chefs,
        userId: req.session.userId,
        error: 'Por favor, preencha todos os campos!',
        recipe: req.body
      }
    }
  }
}

async function post(req, res, next) {
  try {
    const fillAllFields = await checkAllFields(req)
    if(fillAllFields) return res.render('admin/recipes/create', fillAllFields)

    if(req.files.length == 0) {
      const chefs = await Recipe.chefsSelectOptions()
      res.render('admin/recipes/create', {
        chefs,
        userId: req.session.userId,
        error: 'Por favor, envie pelo menos uma imagem!',
        recipe: req.body
      })
    }

    next()
  } catch(error) {
    console.error(error)
  }
}

async function put(req, res, next) {
  try {
    const fillAllFields = await checkAllFields(req)
    if(fillAllFields) return res.render(`admin/recipes/edit`, fillAllFields)

    next()
  } catch(error) {
    console.error(error)
  }
}


module.exports = {
  post,
  put
}