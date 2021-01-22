const User = require("../models/User")

module.exports = {
  async index(req, res) {
    const { user } = req

    return res.render('admin/users/profile', { user })
  },
  async put(req, res) {
    try {
      let { id, name, email } = req.body

      await User.update(id, {
        name,
        email
      })

      return res.render('admin/users/profile', { 
        user: req.body,
        success: 'Usuário alterado com sucesso!'
      })
    } catch(error) {
      console.error(error)
      return res.render('admin/user/edit', {
        user: req.body,
        error: 'Alguma coisa deu errado! Tente novamente.'
      })
    }
  }
}