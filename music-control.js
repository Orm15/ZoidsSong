document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector(".start-btn");
    const audioElement = document.getElementById("background-music");
  
    startButton.addEventListener("click", () => {
      audioElement.play();
    });
  });
  