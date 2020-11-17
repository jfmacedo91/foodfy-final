const db = require('../../config/db')

module.exports = {
  all(callback) {
    db.query(`
      SELECT chefs.*, count(recipes) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      GROUP BY chefs.id
      ORDER BY total_recipes DESC`, (error, results) => {
      if(error) throw `Erro no banco de dados! ${error}`
      
      callback(results.rows)
    })
  },
  create(data, callback) {
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

    db.query(query, values, (error, results) => {
      if(error) throw `Erro no banco de dados! ${error}`

      callback(results.rows[0])
    })
  },
  find(id, callback) {
    db.query(`
      SELECT chefs.*, count(recipes) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      WHERE chefs.id = $1
      GROUP BY chefs.id
    `, [id], (error, results) => {
      if(error) throw `Erro no banco de dados! ${error}`

      callback(results.rows[0])
    })
  },
  update(data, callback) {
    const query = `
      UPDATE chefs SET
        name=($1),
        avatar_url=($2)
      WHERE id = $3
    `

    const values = [
      data.name,
      data.avatar_url,
      data.id
    ]

    return db.query(query, values, (error, results) => {
      if(error) throw `Erro no banco de dados! ${error}`

      callback()
    })
  },
  delete(id, callback) {
    db.query(`DELETE FROM chefs WHERE id = $1`, [id], (error, results) => {
      if(error) throw `Erro no banco de dados! ${error}`

      return callback()
    })
  },
  chefRecipes(id, callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE recipes.chef_id = $1
      ORDER BY recipes.title
    `, [id], (error, results) => {
      if(error) throw `Erro no banco de dados! ${error}`

      callback(results.rows)
    })
  }
}