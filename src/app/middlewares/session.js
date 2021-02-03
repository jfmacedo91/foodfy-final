const Recipe = require('../models/Recipe')

function onlyUsers(req, res, next) {
  if(!req.session.userId)
    return res.redirect('/session/login')
  
  next()
}

function onlyAdmin(req, res, next) {
  if(!req.session.isAdmin) {
    req.session.error = 'Desculpe, você não tem permissão para acessar esta página!'
    return res.redirect('/admin/users/profile')
  }

  next()
}

function recipeAdmin(req, res, next) {
  Recipe.find(req.params.id, recipe => {
    if(req.session.userId != recipe.user_id && !req.session.isAdmin) {
      req.session.error = 'Desculpe, você não tem permissão para acessar esta página!'
      return res.redirect('/admin/users/profile')
    }

    next()
  })
}

function isLoggedRedirectToProfile(req, res, next) {
  if(req.session.userId)
    return res.redirect('/admin/users/profile')
  
    next()
}

module.exports = {
  onlyUsers,
  onlyAdmin,
  recipeAdmin,
  isLoggedRedirectToProfile,
}