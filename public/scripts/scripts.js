const recipes = document.querySelectorAll('.recipe')
const informations = document.querySelectorAll('.information')

for(let i = 0; i < recipes.length; i++) {
  recipes[i].addEventListener('click', () => {
    window.location.href = `/recipes/${i}`
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