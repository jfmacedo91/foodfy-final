const db = require('../../config/db')

module.exports = {
  all() {
    return db.query(`SELECT * FROM chefs`)
  }, 
  create(data) {
    const query = `
      INSERT INTO chefs (
        name,
        avatar_url
      ) VALUES ($1, $2)
      RETURNING id
    `

    const values = [
      data.name,
      data.avatar_url
    ]

    return db.query(query, values)
  },
  findOne(id) {
    return db.query(`
      SELECT * FROM chefs WHERE id = $1
    `, [id])
  },
  update(data) {
    const query = `
      UPDATE chefs SET
        name=($1),
        avatar_url=($2)
      WHERE id = ($3)
    `

    const values = [
      data.name,
      data.avatar_url,
      data.id
    ]

    return db.query(query, values)
  }
}