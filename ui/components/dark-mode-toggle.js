class DarkModeToggle extends HTMLElement {
  constructor() {
    super()

    // Create the component's internal elements.
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

    this.appendChild(label)

    // Keep references to the elements.
    this.checkbox = checkbox
    this.slider = span
  }

  connectedCallback() {
    // Restore the saved preference.
    const isDarkMode = localStorage.getItem('darkMode') === 'true'

    this.checkbox.checked = isDarkMode
    document.body.classList.toggle('dark-mode', isDarkMode)

    this.updateLabel()

    // Listen for changes.
    this.checkbox.addEventListener('change', this.handleChange)
  }

  disconnectedCallback() {
    // Clean up the event listener when removed.
    this.checkbox.removeEventListener('change', this.handleChange)
  }

  handleChange = () => {
    const isDarkMode = this.checkbox.checked

    document.body.classList.toggle('dark-mode', isDarkMode)
    localStorage.setItem('darkMode', isDarkMode)

    this.updateLabel()
  }

  updateLabel() {
    this.slider.textContent = this.checkbox.checked ? 'dark' : 'light'
  }
}

// Register the custom element.
customElements.define('dark-mode-toggle', DarkModeToggle)
