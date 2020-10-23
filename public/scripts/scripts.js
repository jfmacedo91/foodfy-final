const modal = document.querySelector('#modal-overlay')
const recipes = document.querySelectorAll('.recipe')

for(const recipe of recipes) {
  recipe.addEventListener('click', () => {
    modal.classList.add('active')
    modal.querySelector('img').src = recipe.querySelector('img').src
    modal.querySelector('img').alt = recipe.querySelector('img').alt
    modal.querySelector('p').innerHTML = recipe.querySelector('p').innerHTML
    modal.querySelector('span').innerHTML = recipe.querySelector('span').innerHTML
  })
}

document.querySelector('.close-modal')
  .addEventListener('click', () => {
    modal.classList.remove('active')
    setTimeout(() => {
      modal.querySelector('img').src = ''
      modal.querySelector('img').alt = ''
      modal.querySelector('p').innerHTML = ''
      modal.querySelector('span').innerHTML = ''
    }, 400)
  })