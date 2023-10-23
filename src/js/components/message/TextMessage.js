import Message from "./Message";

class TextMessage extends Message {
    constructor(text) {
      super();
      this.message.textContent = text;
    }
  }
  
  export default TextMessage;