const ArrayFormDelete = document.querySelectorAll('#form-delete')

for(formDelete of ArrayFormDelete) {
  formDelete.addEventListener('submit', (event) => {
    const confirmation = confirm('Tem certeza que deseja deletar?')
    if(!confirmation)
      event.preventDefault()
  })
}