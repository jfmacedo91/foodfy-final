const db = require('../../config/db')

module.exports = {
  create(data, callback) {
    const query = `
      INSERT INTO recipes(
        chef_id,
        image,
        title,
        ingredients,
        preparation,
        information,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    createdAt = '2020-09-16 20:48:10.440429'
    information = data.information.replace(/\r\n/g, '<br />')

    const values = [
      data.author,
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      information,
      createdAt
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Erro na base de dados! ${err}`

      callback(results.rows[0])
    })
  }
}