function onlyUsers(req, res, next) {
  if(!req.session.userId)
    return res.redirect('/session/login')
  
  next()
}

function isLoggedRedirectToProfile(req, res, next) {
  if(req.session.userId)
    return res.redirect('/admin/users/profile')
  
    next()
}

function onlyAdmin(req, res, next) {
  if(!req.session.isAdmin) {
    req.session.error = 'Desculpe, você não tem permissão para acessar esta página!'
    return res.redirect('/admin/users/profile')
  }

  next()
}

module.exports = {
  onlyUsers,
  isLoggedRedirectToProfile,
  onlyAdmin
}