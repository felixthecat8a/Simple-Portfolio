function setupDarkModeToggle() {
  if (document.getElementById('darkModeCheckbox')) return

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.id = 'darkModeCheckbox'
  checkbox.className = 'dark-mode-checkbox'
  checkbox.setAttribute('role', 'switch')
  checkbox.setAttribute('aria-label', 'toggle dark mode')

  const span = document.createElement('span')
  span.id = 'slider'
  span.textContent = 'light'

  const label = document.createElement('label')
  label.className = 'dark-mode-toggle'
  label.append(checkbox, span)

  const container = document.createElement('div')
  container.className = 'dark-mode-container'
  container.appendChild(label)
  document.body.appendChild(container)

  if (localStorage.getItem('darkMode') === 'true') {
    checkbox.checked = true
    document.body.classList.add('dark-mode')
    span.textContent = 'dark'
  }

  checkbox.setAttribute('aria-checked', checkbox.checked)

  checkbox.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode')
    localStorage.setItem('darkMode', checkbox.checked)
    checkbox.setAttribute('aria-checked', checkbox.checked)
    span.textContent = checkbox.checked ? 'dark' : 'light'
  })
}

module.exports = setupDarkModeToggle
