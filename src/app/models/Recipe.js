const db = require('../../config/db')

module.exports = {
  all() {
    return db.query(`SELECT * FROM recipes`)
  },
  create(data) {
    const query = `
      INSERT INTO recipes(
        title,
        image,
        chef_id,
        ingredients,
        preparation,
        information
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `

    information = data.information.replace(/\r\n/g, '<br />')

    const values = [
      data.title,
      data.image,
      data.chef,
      data.ingredients,
      data.preparation,
      information
    ]

    db.query(query, values)
  }
}