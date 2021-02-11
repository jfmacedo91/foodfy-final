const { compare } = require('bcryptjs')
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

async function edit(req, res, next) {
  const { id } = req.params
  const user = await User.findOne({ where: { id } })

  if(!user) return res.render('admin/users/register', {
    error: 'Usuário não encontrado!'
  })

  next()
}

async function profile(req, res, next) {
  const { userId: id } = req.session

    const user = await User.findOne({ where: { id } })

    if(!user) return res.render('admin/register', {
      error: 'Usuário não encontrado!'
    })

    req.user = user

    next()
}

async function update(req, res, next) {
  const fillAllFields = checkAllFields(req.body)

  if(fillAllFields) {
    return res.render('admin/users/profile', fillAllFields)
  }

  const { id, password } = req.body

  if(!password) return res.render('admin/users/profile', {
    user: req.body,
    error: 'Digite sua senha para atualizar seu cadastro!'
  })

  const user = await User.findOne({ where: { id } })
  const passed = await compare(password, user.password)

  if(!passed) return res.render('admin/users/profile', {
    user: req.body,
    error: 'Senha incorreta!'
  })

  req.user = user

  next()
}

async function del(req, res, next) {
  const users = await User.findAll()

  if(req.session.userId == req.body.id) return res.render('admin/users/list', {
    users,
    error: 'Desculpe, você não pode apagar sua própria conta!'
  })

  next()
}

module.exports = {
  post,
  put,
  edit,
  profile,
  update,
  del
}