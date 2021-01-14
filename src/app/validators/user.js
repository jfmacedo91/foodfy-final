const User = require('../models/User')

function checkAllFields(body) {
  const keys = Object.keys(body)

  for(key of keys) {
    if(body[key] == '') {
      return {
        user: body,
        error: 'Por favor, preencha todos os campos!'
      }
    }
  }
}

async function post(req, res, next) {
  try {
    const fillAllFields = checkAllFields(req.body)
    if(fillAllFields) return res.render('admin/users/register', fillAllFields)

    const { email } = req.body
    const user = await User.findOne({ where: { email } })
    if(user) return res.render('admin/users/register', {
      user: req.body,
      error: 'Usuário já cadastrado!'
    })

    next()
  } catch(error) {
    console.error(error)
  }
}

async function put(req, res, next) {
  try{
    const fillAllFields = checkAllFields(req.body)
    if(fillAllFields) return res.render('admin/users/edit', fillAllFields)
  
    const { id, email } = req.body
    const user = await User.findOne({ where: { id } })
  
    if(email != user.email) {
      const alreadyRegistered = await User.findOne({ where: { email } })
      if(alreadyRegistered) return res.render('admin/users/edit', {
        user: req.body,
        error: 'Email já cadastrado!'
      })
    }
  
    next()
  } catch(error) {
    console.error(error)
  }
}

module.exports = {
  post,
  put
}