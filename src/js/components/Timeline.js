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
      this.inputMsgSendBtn.classList.add('media-btn');
      this.inputMsgSendBtn.textContent = 'Send';
      this.inputMsgContainer.appendChild(this.inputMsgSendBtn);

      this.recordAudioBtn = document.createElement('button');
      this.recordAudioBtn.classList.add('record-audio-btn');
      this.recordAudioBtn.classList.add('media-btn');
      this.recordAudioBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"/></svg>`
      this.inputMsgContainer.appendChild(this.recordAudioBtn);

      
    }

    initGeolocationRequest = () => {
      console.log('initided geoloc request');
    }

    getGeolocAsync = () => new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(data => {
        res(data);
      },
      err => {
        rej(err);
      })
    });

    getGeolocation = async () => {
      if (navigator.geolocation) {
        try {
          this.geolocation = await this.getGeolocAsync();
        } catch(e) {
          // console.log(e);
        }
      } else {

      }
    }

    recordAudio = async () => {
      if (navigator.mediaDevices) {
        try {
          this.media = await navigator.mediaDevices.getUserMedia({
            audio: true
          });
        } catch(e) {
          // console.log(e);
        }
      } else {

      }
    }

    // HANDLERS
    sendMsgHandler = async () => {
      await this.getGeolocation();
      if (!this.geolocation) {
        initGeolocationRequest();
      };
      const {latitude, longitude} = this.geolocation.coords;
      const msg = new TextMessage(this.inputMsg.value);
      msg.addGeolocation(latitude, longitude);
      msg.bindToDOM(this.messagesContainer);
    }

    recordAudioHandler = async () => {
      await this.recordAudio();
      console.log(this.media);
    }

    addEventListeners = () => {
      this.inputMsgSendBtn.addEventListener('click', this.sendMsgHandler);
      this.recordAudioBtn.addEventListener('click', this.recordAudioHandler);
    }
  }
  
  export default Timeline;