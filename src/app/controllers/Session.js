module.exports = {
  loginForm(req, res) {
    return res.render('session/login')
  },
  forgotForm(req, res) {
    return res.render('session/forgot-password')
  },
  resetForm(req, res) {
    return res.render('session/reset-password')
  },
  login(req, res) {
    req.session.userId = req.user.id

    return res.redirect('/admin/users/profile')
  },
  logout(req, res) {
    req.session.destroy()

    return res.redirect('/session/login')
  },
  forgot() {

  },
  reset() {
    
  }
}