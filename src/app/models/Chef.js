const db = require('../../config/db')
const Base = require('./Base')

Base.init({ table: 'chefs' })

module.exports = {
  ...Base,
  async findAll() {
    const results = await db.query(`
      SELECT chefs.*, count(recipes) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      GROUP BY chefs.id
      ORDER BY total_recipes DESC
      `)

    return results.rows
  },
  async findOne(id) {
    const results = await db.query(`
      SELECT chefs.*, count(recipes) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      WHERE chefs.id = $1
      GROUP BY chefs.id
    `, [id])
    
    return results.rows[0]
  },
  async chefRecipes(id) {
    const results = await db.query(`
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE recipes.chef_id = $1
      ORDER BY recipes.created_at DESC
    `, [id])

    return results.rows
  },
  async files(id) {
    const results = await db.query(`
      SELECT * FROM chefs_files WHERE chef_id = $1
    `, [id])

    return results.rows
  }
}