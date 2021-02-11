const faker = require('faker')
const { hash } = require('bcryptjs')

const User = require('./src/app/models/User')
const Chef = require('./src/app/models/Chef')
const ChefFile = require('./src/app/models/ChefFile')
const Recipe = require('./src/app/models/Recipe')
const RecipeFile = require('./src/app/models/RecipeFile')


let usersIds = []
let chefsIds = []
let recipesIds = []
let totalUsers = 3
let totalChefs = 8
let totalRecipes = 18

async function createUsers() {
  const users = []
  const password = await hash('111', 8)

  while(users.length < totalUsers) {
    users.push({
      name: faker.name.findName(),
      email: faker.internet.email().toLowerCase(),
      password,
      is_admin: true
    })
  }

  const usersPromise = users.map(user => User.create(user))
  usersIds = await Promise.all(usersPromise)
}

async function createChefs() {
  let chefs = []
  let chefsFiles = []

  while(chefs.length < totalChefs) {
    chefs.push({
      name: faker.name.firstName()
    })
  }

  const chefsPromise = chefs.map(chef => Chef.create(chef))
  chefsId = await Promise.all(chefsPromise)

  for(let i = 1; i <= totalChefs; i++) {
    chefsFiles.push({
      name: 'chef-placeholder.png',
      path: `public/images/chef-placeholder.png`,
      chef_id: `${i}`
    })
  }

  const chefsFilesPromise = chefsFiles.map(chefFile => ChefFile.create(chefFile))
  chefsIds = await Promise.all(chefsFilesPromise)
}

async function createRecipes() {
  let recipes = []
  let recipeFiles = []

  while(recipes.length < totalRecipes) {
    let ingredients = []
    let preparation = []
  
    for(let i = 0; i < Math.ceil(Math.random() * 6); i++) {
      ingredients.push(faker.lorem.words(Math.ceil(Math.random() * 8)))
      preparation.push(faker.lorem.words(Math.ceil(Math.random() * 10)))
    }

    recipes.push({
      title: faker.commerce.productName(),
      chef_id: chefsIds[Math.floor(Math.random() * totalChefs)],
      user_id: usersIds[Math.floor(Math.random() * totalUsers)],
      ingredients,
      preparation,
      information: faker.lorem.words(Math.ceil(Math.random() * 20))
    })
  }

  const recipesPromise = recipes.map(recipe => Recipe.create(recipe))
  recipesIds = await Promise.all(recipesPromise)

  while(recipeFiles.length < totalRecipes * 2.5) {
    recipeFiles.push({
      name: `recipe-placeholder.png`,
      path: `public/images/recipe-placeholder.png`,
      recipe_id: recipesIds[Math.floor(Math.random() * totalRecipes)]
    })
  }

  const recipeFilesPromise = recipeFiles.map(recipeFile => RecipeFile.create(recipeFile))
  await Promise.all(recipeFilesPromise)
}

async function init() {
  await createUsers()
  await createChefs()
  await createRecipes()
}

init()