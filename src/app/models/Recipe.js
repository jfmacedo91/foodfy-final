const db = require('../../config/db')
const Base = require('./Base')

Base.init({ table: 'recipes' })

module.exports = {
  ...Base,
  async findAll() {
    const results = await db.query(`
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      ORDER BY recipes.created_at DESC
    `)

    return results.rows
  },
  async findOne(id) {
    const results = await db.query(`
      SELECT recipes.*, chefs.name AS chef_name FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE recipes.id = $1
    `, [id])

    return results.rows[0]
  },
  async findBy(filter) {
    const results = await db.query(`
      SELECT recipes.*, chefs.name AS chef_name FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE recipes.title ILIKE '%${filter}%'
      ORDER BY recipes.updated_at DESC
    `)

    return results.rows
  },
  async chefsSelectOptions() {
    const results = await db.query(`
      SELECT id, name FROM chefs
    `)

    return results.rows
  },
  async files(id) {
    const results = await db.query(`
      SELECT * FROM recipes_files
      WHERE recipe_id = $1
    `, [id])

    return results.rows
  }
}