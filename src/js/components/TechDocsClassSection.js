class TechDocsClassSection extends HTMLElement {
  static get observedAttributes() {
    return ['name']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    if (this.shadowRoot.children.length > 0) return
    this.render()
  }

  attributeChangedCallback() {
    if (!this.shadowRoot) return
    this.updateName()
  }

  render() {
    const name = this.getAttribute('name') || 'Class'

    // === STYLE ===
    const style = document.createElement('style')
    style.textContent = `
      section.class-section {
        padding: 0.5em 1em;
        margin-bottom: 1em;
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 12px;
      }

      h1, h2 {
        margin: 0;
      }

      h1.class-name,
      h2.sub-section-heading {
        margin-bottom: 0.25em;
      }

      .code-wrapper {
        background: #333c;
        color: #f1f1f1;
        border-radius: 0.5rem;
        overflow: hidden;
      }

      pre {
        margin: 0;
        padding: 0.75rem;
        overflow-x: auto;
        white-space: pre;
      }

      code {
        font-family: monospace;
        font-size: 0.9rem;
      }
    `

    // === STRUCTURE ===
    const section = document.createElement('section')
    section.className = 'class-section'

    // Class name
    this._title = document.createElement('h1')
    this._title.className = 'class-name'
    this._title.textContent = name

    // === Constructor section (always present, hidden if empty) ===
    const constructorHeading = document.createElement('h2')
    constructorHeading.className = 'sub-section-heading'
    constructorHeading.textContent = 'Constructor'

    const codeWrapper = document.createElement('div')
    codeWrapper.className = 'code-wrapper'

    const pre = document.createElement('pre')
    const code = document.createElement('code')

    const constructorSlot = document.createElement('slot')
    constructorSlot.name = 'constructor'

    code.appendChild(constructorSlot)
    pre.appendChild(code)
    codeWrapper.appendChild(pre)

    const constructorInfo = document.createElement('p')
    const constructorInfoSlot = document.createElement('slot')
    constructorInfoSlot.name = 'constructor-info'
    constructorInfo.appendChild(constructorInfoSlot)

    // Hide constructor section if empty
    const constructorContainer = document.createElement('div')
    constructorContainer.append(constructorHeading, codeWrapper, constructorInfo)

    const toggleConstructorVisibility = () => {
      const hasContent =
        constructorSlot.assignedNodes().length > 0 || constructorInfoSlot.assignedNodes().length > 0

      constructorContainer.style.display = hasContent ? '' : 'none'
    }

    constructorSlot.addEventListener('slotchange', toggleConstructorVisibility)
    constructorInfoSlot.addEventListener('slotchange', toggleConstructorVisibility)

    // === Methods ===
    const methodsHeading = document.createElement('h2')
    methodsHeading.className = 'sub-section-heading'
    methodsHeading.textContent = 'Methods'

    const methodsContainer = document.createElement('div')
    const methodsSlot = document.createElement('slot')
    methodsSlot.name = 'methods'
    methodsContainer.appendChild(methodsSlot)

    // === Assemble ===
    section.append(this._title, constructorContainer, methodsHeading, methodsContainer)

    this.shadowRoot.append(style, section)

    // Initial visibility check (after slot renders)
    requestAnimationFrame(toggleConstructorVisibility)
  }

  updateName() {
    if (this._title) {
      this._title.textContent = this.getAttribute('name') || 'Class'
    }
  }
}

customElements.define('tech-docs-class-section', TechDocsClassSection)
