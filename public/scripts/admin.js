const details = document.querySelectorAll('.recipe')

for(let i = 0; i < details.length; i++) {
  details[i].querySelector('a').addEventListener('click', () => {
    window.location.href = `/admin/recipes/${i}`
  })
}