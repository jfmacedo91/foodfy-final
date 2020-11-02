const data = require('../data.json')

exports.index = (req, res) => {
  return res.render('admin/recipes', { recipes: data.recipes })
}
exports.create = (req, res) => {
  return res.render('admin/create')
}
exports.show = (req, res) => {
  const id = req.params.id;
  const recipe = data.recipes[id]

  res.render('admin/detail', { recipe, id })
}
exports.edit = (req, res) => {
  const id = req.params.id;
  const recipe = data.recipes[id]

  res.render('admin/edit', { recipe })
}
exports.post = (req, res) => {
  console.log(req.body)
}
exports.put = {}
exports.delete = {}