const User = require('../models/User')
const crypto = require('crypto')

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
    const password = crypto.randomBytes(4).toString('hex')
    const createEmail = `
      <div
        style="
          font-family: sans-serif;
          font-weight: 300;
          color: #383838;
        "
      >
        <h3 style="color: #6558C3;">
          Seja bem vindo(a) ao Foodfy ${req.body.name},
        </h3>
        <p>Seu cadastro foi realizado com sucesso!</p>

        <br />

        <p>Essas são suas credenciais para acessar a area administrativa:</p>
        <p>Login: ${req.body.email}</p>
        <p>Senha: ${password}</p>

        <br />

        <p>Para acessar sua conta basta clicar no botão abaixo</p>

        <br />
        
        <a
          style="
          display: inline-block;
          margin-bottom: 16px;
          padding: 15px 20px;
          text-decoration: none;
          border-radius: 4px;
          color: #FFFFFF;
          background-color: #6558C3;
          cursor: pointer;
          "
        >
          Acessar
        </a>

        <p
          style="
            padding-top:16px;
            border-top: 1px solid #989898;
          "
        >
          Te esperamos lá!
        </p>
        <p>Equipe Foodfy.</p>
      </div>
      `

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