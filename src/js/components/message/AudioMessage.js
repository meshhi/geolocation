import TextMessage from "./TextMessage";

class AudioMessage extends TextMessage {
  constructor(text, audioMediaURL) {
    super(text);
    this.text.textContent = text;
    this.audio = document.createElement('audio');
    this.audio.controls = true;
    this.audio.src = audioMediaURL;
    this.message.appendChild(this.audio);
  }
}

export default AudioMessage;