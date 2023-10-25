import "./modal.css";

class Modal {
  constructor() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.modalInner = document.createElement('div');
    this.modalInner.classList.add('modal-inner');
    this.modal.appendChild(this.modalInner);
    this.modal.style.display = 'none';
    document.body.appendChild(this.modal);
  }

  show = () => {
    this.modal.style.display = 'flex';
  }

  hide = () => {
    this.modal.style.display = 'none';
  }
}

export default Modal;