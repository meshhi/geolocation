import './msg.css';

class Message {
    constructor() {
      this.message = document.createElement('div');
      this.message.classList.add('msg');
    }
  
    bindToDOM = (container) => {
      this.container = container;
      this.container.appendChild(this.message);
    }
  }
  
  export default Message;