import "./msg.css";

class Message {
  constructor() {
    this.message = document.createElement("div");
    this.message.classList.add("msg");
    this.text = document.createElement("div");
    this.text.classList.add("msg-text");
    this.message.appendChild(this.text);
    this.geolocationContainer = document.createElement("div");
    this.geolocationContainer.classList.add("geolocation-container");
    this.message.appendChild(this.geolocationContainer);
  }

  bindToDOM = (container) => {
    this.container = container;
    this.container.appendChild(this.message);
  };

  addGeolocation = (latitude, longitude) => {
    this.geolocationContainer.textContent = `${latitude} ${longitude}`;
  };
}

export default Message;
