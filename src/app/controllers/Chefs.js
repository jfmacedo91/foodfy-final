const data = require('../../../data.json')
const Chef = require('../models/Chef')

module.exports = {
  async index(req, res) {
    const results = await Chef.all()
    const chefs = results.rows
  
    return res.render('admin/chefs/list', { chefs })
  },
  create(req, res) {
    return res.render('admin/chefs/create')
  },
  async show(req, res) {
    const id = req.params.id

    const results = await Chef.findOne(id)
    const chef = results.rows[0]

    return res.render('admin/chefs/show', { chef, recipes: data.recipes })
  },
  async post(req, res) {
    await Chef.create(req.body)

    res.redirect('/admin/chefs')
  },
  async edit(req, res) {
    const id = req.params.id

    const results = await Chef.findOne(id)
    const chef = results.rows[0]

    res.render('admin/chefs/edit', { chef })
  },
  async put(req, res) {
    const { id } = req.body

    await Chef.update(req.body)

    res.redirect(`/admin/chefs/${ id }`)
  }
}