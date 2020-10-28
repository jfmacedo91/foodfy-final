const data = require('../data.json')

exports.index = (req, res) => {
  return res.render('admin/index', { recipes: data.recipes })
}
exports.create = (req, res) => {
  return res.render('admin/create')
}
exports.show = (req, res) => {
  const id = req.params.id;
  const recipe = data.recipes[id]

  res.render('admin/show', { recipe })
}
exports.edit = (req, res) => {
  const id = req.params.id;
  const recipe = data.recipes[id]

  res.render('admin/edit', { recipe })
}
exports.port = {}
exports.put = {}
exports.delete = {}