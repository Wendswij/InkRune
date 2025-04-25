const fullscreenButton = document.getElementById("fullscreen-toggle");

fullscreenButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    fullscreenButton.textContent = "EXIT FULLSCREEN";
  } else {
    fullscreenButton.textContent = "FULLSCREEN";
  }
});