import '../less/style.less'
import './components'
import ModalDialogHandler from './modules/modal'
import setupDarkModeToggle from './modules/toggle'

new ModalDialogHandler(
  'openButton00',
  'dialog00',
  'closeButton00',
  () => {
    console.log('Modal opened!')
  },
  () => {
    console.log('Modal closed!')
  }
)

new ModalDialogHandler(
  'openButton01',
  'dialog01',
  'closeButton01',
  () => {
    console.log('Modal opened!')
  },
  () => {
    console.log('Modal closed!')
  }
)

new ModalDialogHandler(
  'openButton02',
  'dialog02',
  'closeButton02',
  () => {
    console.log('Modal opened!')
  },
  () => {
    console.log('Modal closed!')
  }
)

new ModalDialogHandler(
  'openButton03',
  'dialog03',
  'closeButton03',
  () => {
    console.log('Modal opened!')
  },
  () => {
    console.log('Modal closed!')
  }
)

setupDarkModeToggle()
