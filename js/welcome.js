const proceedBtn = document.querySelector(".default-btn");
const checkbox = document.querySelector("input");

// attivo o disattivo il pulsante
const activateProceedBtn = () => {
  if (checkbox.checked) {
    proceedBtn.classList.add("active-btn");
    proceedBtn.disabled = false;
  } else {
    proceedBtn.classList.remove("active-btn");
  }
};

window.onload = () => {
  // attivo il pulsante dopo aver marcato il checkbox
  checkbox.onclick = () => {
    activateProceedBtn();
  };

  const proceedForm = document.querySelector("form");
  proceedForm.onsubmit = (event) => {
    event.preventDefault();
    // se l'utente ha marcato il check
    if (checkbox.checked) {
      // passa alla pagina del quiz
      window.location.href = "/benchmark-page.html";
    } else {
      // altrimenti mostro l'alert
      document.querySelector(".alert-container").style.display = "flex";
      document.querySelector(".checkmark").style.border = "2px solid #d20094";
    }
  };

  // funzione per chiudere alert al click sulla X
  const modalClose = document.querySelector(".alert-close");
  modalClose.onclick = () => {
    document.querySelector(".alert-container").style.display = "none";
    document.querySelector(".checkmark").style.border = "1px solid white";
  };
};
