import TextMessage from "./message/TextMessage";
import AudioMessage from "./message/AudioMessage";
import Modal from "./Modal";

import "./timeline.css";
class Timeline {
  constructor() {
    this.timeline = document.createElement("div");
    this.timeline.classList.add("timeline");
    this.createMessagesContainer(this.timeline);
    this.createInputMsgContainer(this.timeline);
    this.addEventListeners();
  }

  bindToDOM = (container) => {
    this.container = container;
    this.container.appendChild(this.timeline);
  };

  createMessagesContainer = (container) => {
    this.messagesCommonContainer = document.createElement("div");
    this.messagesCommonContainer.classList.add("msg-container-common");
    container.appendChild(this.messagesCommonContainer);
    this.messagesTimeIndicator = document.createElement("div");
    this.messagesTimeIndicator.classList.add("msg-time-indicator");
    this.messagesCommonContainer.appendChild(this.messagesTimeIndicator);
    this.messagesContainer = document.createElement("div");
    this.messagesContainer.classList.add("msg-container");
    this.messagesCommonContainer.appendChild(this.messagesContainer);
  };

  createInputMsgContainer = (container) => {
    this.inputMsgContainer = document.createElement("div");
    this.inputMsgContainer.classList.add("input-msg-container");
    container.appendChild(this.inputMsgContainer);
    this.inputMsg = document.createElement("input");
    this.inputMsg.classList.add("input-msg");
    this.inputMsg.type = "text";
    this.inputMsgContainer.appendChild(this.inputMsg);

    // DEBUG
    this.inputMsgSendBtn = document.createElement("button");
    this.inputMsgSendBtn.classList.add("input-msg-send-btn");
    this.inputMsgSendBtn.classList.add("media-btn");
    this.inputMsgSendBtn.textContent = "Send";
    this.inputMsgContainer.appendChild(this.inputMsgSendBtn);

    this.recordAudioBtn = document.createElement("button");
    this.recordAudioBtn.classList.add("record-audio-btn");
    this.recordAudioBtn.classList.add("media-btn");
    this.recordAudioBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"/></svg>`;
    this.inputMsgContainer.appendChild(this.recordAudioBtn);

    this.applyRecordAudioBtn = document.createElement("button");
    this.applyRecordAudioBtn.classList.add("media-btn");
    this.applyRecordAudioBtn.classList.add("apply-record-audio-btn");
    this.applyRecordAudioBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`;
    this.stopRecordAudioBtn = document.createElement("button");
    this.stopRecordAudioBtn.classList.add("media-btn");
    this.stopRecordAudioBtn.classList.add("stop-record-audio-btn");
    this.stopRecordAudioBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`;
    this.timerElement = document.createElement("div");
    this.timerElement.classList.add("timer");
  };

  // GEOLOCATIONS
  initGeolocationRequest = async () => {
    this.modal = new Modal();
    this.modal.show();
    this.geolocation = {};
    this.geolocation.coords = await this.modal.awaiter();
    this.modal.hide();
  };

  getGeolocAsync = () =>
    new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        (data) => {
          res(data);
        },
        (err) => {
          rej(err);
        }
      );
    });

  getGeolocation = async () => {
    if (navigator.geolocation) {
      try {
        this.geolocation = await this.getGeolocAsync();
      } catch (e) {
        this.geolocation = undefined;
      }
    } else {
      this.geolocation = undefined;
    }
  };

  // APPROVE MEDIA HANLDERS
  applyAudioRecord = async () => {
    this.recorder.stop();
    this.mediaStream.getTracks().forEach((track) => {
      track.stop();
    });
    this.updateUIButtonsForCommon();
  };

  stopAudioRecord = async () => {
    this.isMsgRecordInterrupt = true;
    this.recorder.stop();
    this.mediaStream.getTracks().forEach((track) => {
      track.stop();
    });
    this.updateUIButtonsForCommon();
  };

  // INIT RECORD
  recordAudio = async () => {
    if (navigator.mediaDevices) {
      try {
        this.isMsgRecordInterrupt = false;
        this.mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        this.msg = undefined;
        this.startTimer();
        this.recorder = new MediaRecorder(this.mediaStream);
        const chunks = [];

        this.recorder.addEventListener("start", () => {
          console.log("start");
        });

        this.recorder.addEventListener("dataavailable", (event) => {
          chunks.push(event.data);
        });

        this.recorder.addEventListener("stop", async () => {
          this.stopTimer();
          if (this.isMsgRecordInterrupt) return;
          this.applyRecordAudioBtn.style.pointerEvents = "none";
          this.recordAudioBtn.style.pointerEvents = "none";
          const blob = new Blob(chunks);
          const url = URL.createObjectURL(blob);
          this.msg = new AudioMessage(this.inputMsg.value, url);
          this.inputMsg.value = "";
          await this.getGeolocation();
          if (!this.geolocation) {
            await this.initGeolocationRequest();
          }
          const { latitude, longitude } = this.geolocation.coords;
          this.msg.addGeolocation(latitude, longitude);
          this.msg.bindToDOM(this.messagesContainer);
          this.applyRecordAudioBtn.style.pointerEvents = "auto";
          this.recordAudioBtn.style.pointerEvents = "auto";
        });
        this.recorder.start();
        try {
          this.applyRecordAudioBtn.removeEventListener(
            "click",
            this.applyAudioRecord
          );
        } catch (e) {
          console.log(e);
        }
        this.applyRecordAudioBtn.addEventListener(
          "click",
          this.applyAudioRecord
        );
        try {
          this.stopRecordAudioBtn.removeEventListener(
            "click",
            this.stopAudioRecord
          );
        } catch (e) {
          console.log(e);
        }
        this.stopRecordAudioBtn.addEventListener("click", this.stopAudioRecord);
      } catch (e) {
        console.log(e);
      }
    }
  };

  // UI UPDATE
  updateUIButtonsForRecording = () => {
    this.recordAudioBtn.remove();
    this.inputMsgSendBtn.remove();
    this.inputMsgContainer.appendChild(this.applyRecordAudioBtn);
    this.inputMsgContainer.appendChild(this.timerElement);
    this.inputMsgContainer.appendChild(this.stopRecordAudioBtn);
  };

  updateUIButtonsForCommon = () => {
    this.applyRecordAudioBtn.remove();
    this.timerElement.remove();
    this.stopRecordAudioBtn.remove();
    this.inputMsgContainer.appendChild(this.inputMsgSendBtn);
    this.inputMsgContainer.appendChild(this.recordAudioBtn);
  };

  // RECORD TIMER LOGIC

  startTimer = () => {
    this.i = 0;
    this.timerId = setInterval(() => {
      this.i++;
      this.timerElement.innerHTML = `${this.i}`;
    }, 1000);
  };

  stopTimer = () => {
    this.timerElement.innerHTML = 0;
    clearInterval(this.timerId);
  };
  // BASIC INIT SCENARIO HANDLERS
  sendMsgHandler = async () => {
    await this.getGeolocation();
    if (!this.geolocation) {
      await this.initGeolocationRequest();
    }
    const { latitude, longitude } = this.geolocation.coords;
    const msg = new TextMessage(this.inputMsg.value);
    this.inputMsg.value = "";
    msg.addGeolocation(latitude, longitude);
    msg.bindToDOM(this.messagesContainer);
  };

  recordAudioHandler = async () => {
    this.updateUIButtonsForRecording();
    await this.recordAudio();
  };

  addEventListeners = () => {
    this.inputMsgSendBtn.addEventListener("click", this.sendMsgHandler);
    this.recordAudioBtn.addEventListener("click", this.recordAudioHandler);
  };
}

export default Timeline;
