const data = require('../data.json')

exports.index = (req, res) => {
  return res.render('admin/index', { recipes: data.recipes })
}
exports.create = {}
exports.show = {}
exports.edit = {}
exports.port = {}
exports.put = {}
exports.delete = {}