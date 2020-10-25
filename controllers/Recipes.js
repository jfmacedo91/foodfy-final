const recipes = require('../data')

exports.index = (req, res) => {
  return res.render('recipes', { recipes })
}

exports.show = (req, res) => {
  const index = req.params.index;
  const recipe = recipes[index]

  res.render('recipe', { recipe })
}