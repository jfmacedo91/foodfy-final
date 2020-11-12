const currentPage = location.pathname
const menuItens = document.querySelectorAll('header nav a')

for(item of menuItens) {
  if(currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('active')
  }
}

const recipes = document.querySelectorAll('.recipes-grid .recipe')
const informations = document.querySelectorAll('.information')

for(let i = 0; i < recipes.length; i++) {
  recipes[i].addEventListener('click', () => {
    window.location.href = `/recipes/${i+1}`
  })
}

for(const information of informations) {
  const hideShowButton = information.querySelector('.hideShow')
  hideShowButton.addEventListener('click', () => {
    information.classList.toggle('show')
    if(hideShowButton.innerHTML == 'Mostrar') {
      hideShowButton.innerHTML = 'Esconder'
    } else {
      hideShowButton.innerHTML = 'Mostrar'
    }
  })
}

const details = document.querySelectorAll('.recipe')

for(let i = 0; i < details.length; i++) {
  details[i].querySelector('a').addEventListener('click', () => {
    window.location.href = `/admin/recipes/${i+1}`
  })
}

document.querySelector('.add-ingredient').addEventListener('click', addIngredient)

function addIngredient() {
  const ingredients = document.querySelector("#ingredients")
  const fieldContainer = document.querySelectorAll('.ingredient')
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

  if(newField.children[0].value == '') return false

  newField.children[0].value = ''
  ingredients.appendChild(newField)
}

document.querySelector('.add-step').addEventListener('click', addStep)

function addStep() {
  const preparation = document.querySelector("#preparation")
  const fieldContainer = document.querySelectorAll('.step')
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

  if(newField.children[0].value == '') return false

  newField.children[0].value = ''
  preparation.appendChild(newField)
}