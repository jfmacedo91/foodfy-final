async function checkAllFields(req) {
  const keys = Object.keys(req.body)

  for(key of keys) {
    if(req.body[key] == '' && key != 'removed_files') {
      return {
        error: 'Por favor, preencha todos os campos!',
        chef: req.body
      }
    }
  }
}

async function post(req, res, next) {
  try {
    const fillAllFields = await checkAllFields(req)
    if(fillAllFields) return res.render('admin/chefs/create', fillAllFields)

    if(req.files.length == 0) {
      res.render('admin/chefs/create', {
        error: 'Por favor, envie pelo menos uma imagem!',
        chef: req.body
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
    if(fillAllFields) return res.render(`admin/chefs/edit`, fillAllFields)

    next()
  } catch(error) {
    console.error(error)
  }
}


module.exports = {
  post,
  put
}