const db = require('../../config/db')

const Base = require('./Base')

Base.init({ table: 'users' })

module.exports = {
  ...Base,
  async findAll() {
    const results = await db.query(`
      SELECT *
      FROM users
      ORDER BY updated_at DESC
    `)

    return results.rows
  },
  async findOne(filters) {
    let query = `SELECT * FROM users`

    Object.keys(filters).map(key => {
      query += ` ${key}`

      Object.keys(filters[key]).map(field => {
        query += ` ${field} = '${filters[key][field]}'`
      })
    })

    const results = await db.query(query)
    return results.rows[0]
  }
}