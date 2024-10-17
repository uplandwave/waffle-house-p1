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
    createRegistrationModal();
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

function createRegistrationModal() {
  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("registration-modal-overlay");

  const modalContainer = document.createElement("div");
  modalContainer.classList.add("registration-modal");

  const closeButton = document.createElement("span");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = "&times;";
  closeButton.onclick = () => {
    document.body.removeChild(modalOverlay);
  };

  const message = document.createElement("p");
  message.textContent = "Register for our site to enter an exclusive giveaway!";
  message.classList.add("registration-alert-message");

  modalContainer.appendChild(closeButton);
  modalContainer.appendChild(message);
  modalOverlay.appendChild(modalContainer);
  document.body.appendChild(modalOverlay);

  // Add event listener to the overlay to close modal on click
  modalOverlay.onclick = function (event) {
    // If the user clicks directly on the overlay (not the modal content), close it
    if (event.target === modalOverlay) {
      document.body.removeChild(modalOverlay);
    }
  };
}

function initAlerts() {
  if (modemData.length > 0 && isFirstVisit()) {
    createAlertModal(modemData);
    setFirstVisit();
  }
}

document.addEventListener("DOMContentLoaded", initAlerts);
