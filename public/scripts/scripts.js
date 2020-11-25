//Menu ativo
const currentPage = location.pathname
const menuItens = document.querySelectorAll('header nav a')

for(item of menuItens) {
  if(currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('active')
  }
}

//Mostrar e ocultar informações
if(!currentPage.includes('admin')) {
  const informations = document.querySelectorAll('.information')
  
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
}


//Addicionar campos
if(currentPage.includes('create') || currentPage.includes('edit')) {
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
}

const PhotoUpload = {
  handleFileInput(event) {
    const { files: fileList } = event.target
    
    if(fileList.length > 1) {
      alert("Selecione no máximo 1 foto!")

      event.precentDefault()
      return
    }
  }
}