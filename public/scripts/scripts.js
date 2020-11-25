//Menu ativo
const currentPage = location.pathname
const menuItens = document.querySelectorAll('header nav a')

for(item of menuItens) {
  if(currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('active')
  }
}

const PhotosUpload = {
  handleChefAvatar(event, uploadLimit) {
    const { files: fileList } = event.target

    if(fileList.length > uploadLimit) {
      if(uploadLimit == 1) {
        alert(`Envie apenas ${uploadLimit} foto!`)
      } else {
        alert(`Envie apenas ${uploadLimit} fotos!`)
      }
      event.preventDedault()
      return
    }

    Array.from(fileList).forEach(file => {
      const reader = new FileReader()

      reader.onload = () => {
        const image = new Image()
        image.src = String(reader.result)

        const container = document.createElement('div')

        container.classList.add('photo')
        container.onclick = () => alert('remover foto')
        container.appendChild(image)

        document.querySelector('#photos-preview').appendChild(container)
      }

      reader.readAsDataURL(file)
    })
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