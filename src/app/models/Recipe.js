const db = require('../../config/db')

module.exports = {
  all(callback) {
    return db.query(`
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      ORDER BY recipes.created_at DESC
    `, (error, results) => {
      if(error) throw `Erro no banco de dados! ${error}`

      callback(results.rows)
    })
  },
  create(req, data, callback) {
    const query = `
      INSERT INTO recipes(
        title,
        chef_id,
        user_id,
        ingredients,
        preparation,
        information
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `

    information = data.information.replace(/\r\n/g, '<br />')
    const userId = req.session.userId

    const values = [
      data.title,
      data.chef,
      userId,
      data.ingredients,
      data.preparation,
      information
    ]


    db.query(query, values, (error, results) => {
      if(error) throw `Erro no banco de dados! ${ error }`

      callback(results.rows[0])
    })
  },
  find(id, callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE recipes.id = $1
    `, [id], (error, results) => {
      if(error) throw `Erro no banco de dados! ${ error }`

      callback(results.rows[0])
    })
  },
  findBy(filter, callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE recipes.title ILIKE '%${filter}%'
      ORDER BY recipes.updated_at DESC
    `, (error, results) => {
      if(error) throw `Erro no banco de dados! ${error}`

      callback(results.rows)
    })
  },
  update(data, callback) {
    const query = `
      UPDATE recipes SET
        title=($1),
        chef_id=($2),
        ingredients=($3),
        preparation=($4),
        information=($5)
      WHERE id = $6
      RETURNING id
    `

    information = data.information.replace(/\r\n/g, '<br />')

    const values = [
      data.title,
      data.chef,
      data.ingredients,
      data.preparation,
      information,
      data.id
    ]

    return db.query(query, values, (error, results) => {
      if(error) throw `Erro no banco de dados! ${error}`

      callback(results.rows[0])
    })
  },
  delete(id, callback) {
    db.query(`DELETE FROM recipes WHERE id = $1`, [id], (error, results) => {
      if(error) throw `Erro no banco de dados! ${error}`

      return callback()
    })
  },
  chefsSelectOptions(callback) {
    db.query(`SELECT id, name FROM chefs`, (error, results) => {
      if(error) throw `Erro no banco de dados ${error}`

      callback(results.rows)
    })
  },
  files(id) {
    return db.query(`
      SELECT * FROM recipes_files WHERE recipe_id = $1
    `, [id])
  }
}