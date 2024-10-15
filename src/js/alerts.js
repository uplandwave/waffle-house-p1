import modemData from "./alerts.json";

// this line is to clear local storage
// localStorage.removeItem("hasVisited");

function isFirstVisit() {
  return !localStorage.getItem("hasVisited");
}

function setFirstVisit() {
  localStorage.setItem("hasVisited", "true");
}

function createAlertModal(alerts) {
  // creates modal container and overlay
  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("alert-modal-overlay");

  const modalContainer = document.createElement("div");
  modalContainer.classList.add("alert-modal");

  const closeButton = document.createElement("span");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = "&times;";
  closeButton.onclick = () => {
    document.body.removeChild(modalOverlay);
  };

  // lets you close the pop up
  modalContainer.appendChild(closeButton);

  // this is a loop to creat an anouncement for each alert
  alerts.forEach((alert) => {
    const alertMessage = document.createElement("p");
    alertMessage.textContent = alert.message;
    alertMessage.style.backgroundColor = alert.background;
    alertMessage.style.color = alert.color;
    alertMessage.style.fontSize = alert.fontSize;
    alertMessage.classList.add("alert-message");

    modalContainer.appendChild(alertMessage);
  });

  // append modal to overlay and add to body
  modalOverlay.appendChild(modalContainer);
  document.body.appendChild(modalOverlay);
}

function initAlerts() {
  if (modemData.length > 0 && isFirstVisit()) {
    createAlertModal(modemData);
    setFirstVisit();
  }
}

document.addEventListener("DOMContentLoaded", initAlerts);
