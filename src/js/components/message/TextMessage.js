import Message from "./Message";

class TextMessage extends Message {
    constructor(text) {
      super();
      this.text.textContent = text;
    }
  }
  
  export default TextMessage;