//Menu ativo
const currentPage = location.pathname
const menuItens = document.querySelectorAll('header nav a')

for(item of menuItens) {
  if(currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('active')
  }
}

const PhotosUpload = {
  preview: document.querySelector('#photos-preview'),
  files: [],
  input: '',
  handleChefAvatar(event, uploadLimit) {
    const { files: fileList } = event.target
    const { preview } = PhotosUpload
    PhotosUpload.input = event.target

    if(fileList.length > uploadLimit) {
      if(uploadLimit == 1) {
        alert(`Envie apenas ${uploadLimit} foto!`)
      } else {
        alert(`Envie apenas ${uploadLimit} fotos!`)
      }
      event.preventDefault()
      return
    }

    const photosContainer = []
    preview.childNodes.forEach(item => {
      if(item.classList && item.classList.value == 'photo')
        photosContainer.push(item)
    })

    const totalPhotos = fileList.length + photosContainer.length
    if(totalPhotos > uploadLimit) {
      alert('Você atingiu o limite maximo de fotos')
      event.preventDefault()
      return
    }

    Array.from(fileList).forEach(file => {
      PhotosUpload.files.push(file)

      const reader = new FileReader()
      reader.onload = () => {
        const image = new Image()
        image.src = String(reader.result)

        const container = PhotosUpload.getContainer(image)
        PhotosUpload.preview.appendChild(container)
      }

      reader.readAsDataURL(file)
    })

    PhotosUpload.input.files = PhotosUpload.getAllFiles()
  },
  getAllFiles() {
    const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer()

    PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

    return dataTransfer.files
  },
  getContainer(image) {
    const container = document.createElement('div')
    container.classList.add('photo')
    container.onclick = PhotosUpload.removePhoto
    container.appendChild(image)
    container.appendChild(PhotosUpload.getRemoveButton())

    return container
  },
  getRemoveButton() {
    const button = document.createElement('span')
    button.innerHTML = 'X'
    return button
  },
  removePhoto(event) {
    const photoContainer = event.target.parentNode
    const photosArray = Array.from(PhotosUpload.preview.children)
    const index = photosArray.indexOf(photoContainer)

    PhotosUpload.files.splice(index, 1)
    PhotosUpload.input.files = PhotosUpload.getAllFiles()

    photoContainer.remove()
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