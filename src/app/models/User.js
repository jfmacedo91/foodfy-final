const db = require('../../config/db')
const { hash } = require('bcryptjs')

module.exports = {
  async all() {
    const results = await db.query(`
      SELECT * FROM users
      ORDER BY created_at DESC
    `)

    return results.rows
  },
  find(id, callback) {
    db.query(`
      SELECT * FROM users WHERE users.id = $1
    `, [id], (error, results) => {
      if(error) throw `Erro no banco de dados! ${error}`

      callback(results.rows[0])
    })
  },
  async findOne(filters) {
    let query = `SELECT * FROM users`

    Object.keys(filters).map(key => {
      query = `${query} ${key}`

      Object.keys(filters[key]).map(field => {
        query = `${query} ${field} = '${filters[key][field]}'`
      })
    })

    const results = await db.query(query)
    return results.rows[0]
  },
  async create(data) {
    try {
      const query = `
        INSERT INTO users (
          name,
          email,
          password,
          is_admin
        ) VALUES ($1, $2, $3, $4)
        RETURNING id
      `
  
      const passwordHash = await hash(data.password, 8)
  
      const values = [
        data.name,
        data.email,
        passwordHash,
        data.is_admin || false
      ]
  
      const results = await db.query(query, values)
      return results.rows[0].id
    } catch(error) {
      console.error(error)
    }
  },
  async update(id, fields) {
    let query = "UPDATE users SET"

    Object.keys(fields).map((key, index, array) => {
      if((index + 1) < array.length) {
        query = `${query}
          ${key} =  '${fields[key]}',
        `
      } else {
        query = `${query}
          ${key} =  '${fields[key]}'
          WHERE id = ${id}
        `
      }
    })

    await db.query(query)
  }
}