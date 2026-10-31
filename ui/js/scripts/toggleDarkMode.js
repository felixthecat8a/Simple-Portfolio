function toggleDarkMode() {
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.id = 'darkModeCheckbox'
  checkbox.className = 'dark-mode-checkbox'

  const span = document.createElement('span')
  span.id = 'slider'
  span.textContent = 'light'

  const label = document.createElement('label')
  label.className = 'dark-mode-toggle'
  label.appendChild(checkbox)
  label.appendChild(span)

  document.body.appendChild(label)

  if (localStorage.getItem('darkMode') === 'true') {
    checkbox.checked = true
    document.body.classList.add('dark-mode')
    span.textContent = 'dark'
  }

  checkbox.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode')
    localStorage.setItem('darkMode', checkbox.checked)
    span.textContent = checkbox.checked ? 'dark' : 'light'
  })
}

document.addEventListener('DOMContentLoaded', () => {
  toggleDarkMode()
})
