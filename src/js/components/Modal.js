class Modal {
  constructor() {
    this.modal = document.createElement('div');
    this.modal = document.classList.add('modal');
    this.modalInner = document.createElement('div');
    this.modalInner = document.classList.add('modal-inner');
    this.modal.appendChild(this.modalInner);
  }
}

export default Modal;