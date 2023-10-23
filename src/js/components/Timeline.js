import TextMessage from "./message/TextMessage";
import './timeline.css';
class Timeline {
    constructor() {
      this.timeline = document.createElement('div');
      this.timeline.classList.add('timeline');
      this.createMessagesContainer(this.timeline);
      this.createInputMsgContainer(this.timeline);
      this.addEventListeners();
    }
  
    bindToDOM = (container) => {
      this.container = container;
      this.container.appendChild(this.timeline);
    }

    createMessagesContainer = (container) => {
      this.messagesCommonContainer = document.createElement('div');
      this.messagesCommonContainer.classList.add('msg-container-common');
      container.appendChild(this.messagesCommonContainer);
      this.messagesTimeIndicator = document.createElement('div');
      this.messagesTimeIndicator.classList.add('msg-time-indicator');
      this.messagesCommonContainer.appendChild(this.messagesTimeIndicator);
      this.messagesContainer = document.createElement('div');
      this.messagesContainer.classList.add('msg-container');
      this.messagesCommonContainer.appendChild(this.messagesContainer);
    }

    createInputMsgContainer = (container) => {
      this.inputMsgContainer = document.createElement('div');
      this.inputMsgContainer.classList.add('input-msg-container');
      container.appendChild(this.inputMsgContainer);
      this.inputMsg = document.createElement('input');
      this.inputMsg.classList.add('input-msg');
      this.inputMsg.type = 'text';
      this.inputMsgContainer.appendChild(this.inputMsg);

      // DEBUG
      this.inputMsgSendBtn = document.createElement('button');
      this.inputMsgSendBtn.classList.add('input-msg-send-btn');
      this.inputMsgSendBtn.textContent = 'Send';
      this.inputMsgContainer.appendChild(this.inputMsgSendBtn);
    }

    // HANDLERS
    sendMsgHandler = () => {
      const msg = new TextMessage(this.inputMsg.value);
      msg.bindToDOM(this.messagesContainer);
    }

    addEventListeners = () => {
      this.inputMsgSendBtn.addEventListener('click', this.sendMsgHandler);
    }
  }
  
  export default Timeline;