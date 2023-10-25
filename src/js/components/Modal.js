import "./modal.css";
import { getCoordinatesFromInput } from "../utils";

class Modal {
  constructor() {
    this.getCoordinatesFromInput = getCoordinatesFromInput;
    this.modal = document.createElement("div");
    this.modal.classList.add("modal");
    this.modalInner = document.createElement("div");
    this.modalInner.classList.add("modal-inner");
    this.modal.appendChild(this.modalInner);
    this.inputCoordinatesForm = document.createElement("form");
    this.inputCoordinatesForm.classList.add("input-coordinates-form");
    this.modalInner.appendChild(this.inputCoordinatesForm);
    this.inputLongitude = document.createElement("input");
    this.inputLongitude.classList.add("input-longitude");
    this.inputLongitude.placeholder = "Longitude";
    this.inputLatitude = document.createElement("input");
    this.inputLatitude.classList.add("input-latitude");
    this.inputLatitude.placeholder = "Latitude";
    this.submitBtn = document.createElement("button");
    this.submitBtn.classList.add("submit-coordinates");
    this.submitBtn.textContent = "submit";
    this.submitBtn.type = "submit";
    // this.inputCoordinatesForm.appendChild(this.inputLatitude);
    // this.inputCoordinatesForm.appendChild(this.inputLongitude);
    this.inputCoordinates = document.createElement("input");
    this.inputCoordinates.classList.add("input-coordinates");
    this.inputCoordinates.placeholder = "Coordinates";
    this.inputCoordinatesForm.appendChild(this.inputCoordinates);

    this.inputCoordinatesForm.appendChild(this.submitBtn);
    this.modal.style.display = "none";
    if (document && document.body) document.body.appendChild(this.modal);
  }

  awaiter = () => {
    return new Promise((resolve, reject) => {
      this.inputCoordinatesForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let coordinates;
        try {
          coordinates = this.getCoordinatesFromInput(
            this.inputCoordinates.value
          );
        } catch (e) {
          if (
            this.inputError &&
            this.inputError.closest(".input-coordinates-form")
          ) {
            this.inputError.remove();
          }
          this.inputError = document.createElement("div");
          this.inputError.classList.add("input-error");
          this.inputError.textContent = "Error";
          this.inputCoordinatesForm.appendChild(this.inputError);
          return;
        }
        resolve(coordinates);
      });
    });
  };

  show = () => {
    this.modal.style.display = "flex";
  };

  hide = () => {
    this.modal.style.display = "none";
  };
}

export default Modal;
