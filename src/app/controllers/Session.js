const crypto = require('crypto')
const { hash } = require('bcryptjs')

const User = require('../models/User')
const mailer = require('../../lib/mailer')

module.exports = {
  loginForm(req, res) {
    return res.render('session/login')
  },
  forgotForm(req, res) {
    return res.render('session/forgot-password')
  },
  resetForm(req, res) {
    return res.render('session/reset-password', { token: req.query.token })
  },
  login(req, res) {
    req.session.userId = req.user.id

    return res.redirect('/admin/users/profile')
  },
  logout(req, res) {
    req.session.destroy()

    return res.redirect('/session/login')
  },
  async forgot(req, res) {
    const { user } = req

    try {
      const token = crypto.randomBytes(20).toString('hex')
      let now = new Date()
      now = now.setHours(now.getHours() + 1)
  
      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now
      })
  
      await mailer.sendMail({
        to: user.email,
        from: 'no-replay@foodfy.com.br',
        subject: 'Recupeção de senha [Foodfy]',
        html: `
          <div
            style="
              font-family: sans-serif;
              font-weight: 300;
              color: #383838;
            "
          >
            <h3 style="color: #6558C3;">
              Perdeu a chave?
            </h3>
            <p>Não se preocupe, clique no link abaixo para recuperar sua senha.</p>
            <a href="http://localhost:3000/session/reset-password?token=${token}"
              target="_blank"
              style="color: #6558C3"
            >
              RECUPERAR SENHA
            </a>
          </div>
        `
      })
  
      return res.render('session/forgot-password', {
        success: 'Verifique seu email para recuperar sua senha!'
      })
    } catch(error) {
      console.error(error)
      res.render('session/forgot-password', {
        error: 'Um erro inesperado aconteceu, tente novamente!'
      })
    }
  },
  async reset(req, res) {
    const user = req.user
    const { password, token } = req.body

    try {
      const newPassword = await hash(password, 8)

      await User.update(user.id, {
        password: newPassword,
        reset_token: '',
        reset_token_expires: ''
      })

      return res.render('session/login', {
        user: req.body,
        success: 'Senha atualizada com sucesso!'
      })
    } catch(error) {
      console.error(error)
      return res.render('session/reset-password', {
        error: 'Um erro inesperado aconteceu, tente novamente!'
      })
    }
  }
}