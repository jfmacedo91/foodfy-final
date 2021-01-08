const User = require('../models/User')

module.exports = {
  registerForm(req, res) {
    return res.render('admin/users/register')
  },
  editForm(req, res) {
    return res.render('admin/users/edit')
  },
  list() {

  },
  post(req, res) {
    return res.send('passed')
  },
  put() {
    const keys = Object.keys(req.body)

    for(key of keys) {
      if(req.body[key] = '') {
        return res.send('Por favor, preencha todos os campos!')
      }
    }
  },
  delete() {
    
  }
}