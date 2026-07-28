class ModalDialogHandler {
  constructor(openButtonId, dialogId, closeButtonId, onOpen = null, onClose = null) {
    this.openButton = document.getElementById(openButtonId)
    this.dialog = document.getElementById(dialogId)
    this.closeButton = document.getElementById(closeButtonId)
    this.onOpen = onOpen
    this.onClose = onClose

    if (!this.openButton || !this.dialog || !this.closeButton) {
      console.error(`ModalDialog: Missing element(s) for ${dialogId}`)
      return
    }

    this.addEventListeners()
  }

  addEventListeners() {
    this.openButton.addEventListener('click', () => this.open())
    this.closeButton.addEventListener('click', () => this.close())

    this.dialog.addEventListener('click', event => {
      if (event.target === this.dialog) this.close()
    })

    this.dialog.addEventListener('cancel', event => {
      event.preventDefault()
      this.close()
    })

    this.dialog.addEventListener('close', () => {
      if (typeof this.onClose === 'function') this.onClose()
    })
  }

  open() {
    if (!this.dialog.open) {
      this.dialog.showModal()
      if (typeof this.onOpen === 'function') this.onOpen()
    }
  }

  close() {
    if (this.dialog.open) this.dialog.close()
  }
}

module.exports = ModalDialogHandler
