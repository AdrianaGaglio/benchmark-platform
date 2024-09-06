let stars = document.querySelectorAll(".star");

// funzione per spegnere le stelline
function resetStars() {
  stars.forEach(function (star) {
    star.classList.remove("selected");
  });
}

// funzione per accendere le stelline
function setStarsUpTo(index) {
  resetStars();
  for (let j = 0; j <= index; j++) {
    stars[j].classList.add("selected");
  }
}

// funzione per attivare il bottone
const handleBtnActivation = () => {
  const selectedStars = document.querySelectorAll(".selected");
  // aggiunto controllo caratteri minimi
  if (feedbackText.value.length >= 10 && selectedStars.length > 0) {
    feedbackButton.classList.add("active-btn");
  } else if (feedbackText.value.length <= 10) {
    feedbackButton.classList.remove("active-btn");
  }
};

window.onload = () => {
  let selectedIndex = -1;

  // funzione che accende le stelline al passaggio del mouse
  for (let i = 0; i < stars.length; i++) {
    stars[i].onmouseover = function () {
      if (selectedIndex === -1) {
        setStarsUpTo(i);
      }
    };

    // funzione che spegne le stelline quando il mouse si sposta
    stars[i].onmouseout = function () {
      if (selectedIndex === -1) {
        resetStars();
      }
    };

    stars[i].onclick = function () {
      selectedIndex = i;
      setStarsUpTo(i);
      if (feedbackText.value.length >= 10) {
        feedbackButton.classList.add("active-btn");
      }
    };
  }

  // funzione che attiva il pulsante alla compilazione del campo feedback
  feedbackText.oninput = function () {
    handleBtnActivation();
  };
};

const feedbackButton = document.querySelector(".default-btn");
const feedbackText = document.querySelector("#comment-input");
const feedbackForm = document.querySelector("form");

// gestisco le funzioni al submit del form
feedbackForm.onsubmit = function (event) {
  event.preventDefault();
  // controllo se il campo è vuoto
  const selectedStars = document.querySelectorAll(".selected");
  if (feedbackText.value === "" && selectedStars.length === 0) {
    // mostro alert all'utente
    document.querySelector(".alert-container").style.display = "flex";
    feedbackText.style.border = "2px solid #d20094";
  } else if (feedbackText.value === "" && selectedStars.length > 0) {
    document.querySelector(".alert-text").innerText = "You must add a comment before submit!";
    document.querySelector(".alert-container").style.display = "flex";
  } else if (feedbackText.value.length < 10 && selectedStars.length > 0) {
    document.querySelector(".alert-text").innerText = "Your comment must be at least 10 characters long!";
    document.querySelector(".alert-container").style.display = "flex";
  } else if (feedbackText.value !== "" && selectedStars.length === 0) {
    document.querySelector(".alert-text").innerText = "You must mark at least 1 star!";
    document.querySelector(".alert-container").style.display = "flex";
  } else {
    // altrimenti confermo sottomissione e rimando all'homepage con un delay di 3 secondi (temporaneo)
    document.querySelector(".alert-text").innerText = "Your feedback has been correctly submitted!";
    document.querySelector(".alert-close").style.display = "none";
    document.querySelector(".alert-container").style.display = "flex";
    setTimeout(function () {
      window.location.href = "./exit.html";
    }, 1500);
    feedbackText.value = "";
  }

  // funzione per chiudere l'alert al click sulla X
  const modalClose = document.querySelector(".alert-close");
  modalClose.onclick = () => {
    document.querySelector(".alert-container").style.display = "none";
    feedbackText.style = "border-top:none";
    feedbackText.style.border = "border-bottom: 2px solid #d20094";
  };
};
