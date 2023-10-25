import Timeline from "./components/Timeline";

const start = () => {
  const rootContainer = document.querySelector(".container");
  const timeline = new Timeline();
  timeline.bindToDOM(rootContainer);
};

start();
