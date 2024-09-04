let stars = document.querySelectorAll(".star");

function resetStars() {
  stars.forEach(function (star) {
    star.classList.remove("selected");
  });
}

function setStarsUpTo(index) {
  resetStars();
  for (let j = 0; j <= index; j++) {
    stars[j].classList.add("selected");
  }
}

const activateBtn = () => {
  const selectedStars = document.querySelectorAll(".selected");
  if (feedbackText.value !== "" && selectedStars.length > 0) {
    feedbackButton.classList.add("active-btn");
  }
};

window.onload = () => {
  let selectedIndex = -1;

  for (let i = 0; i < stars.length; i++) {
    stars[i].onmouseover = function () {
      if (selectedIndex === -1) {
        setStarsUpTo(i);
      }
    };

    stars[i].onmouseout = function () {
      if (selectedIndex === -1) {
        resetStars();
      }
    };

    stars[i].onclick = function () {
      selectedIndex = i;
      setStarsUpTo(i);
      document.querySelector("#comment-input").disabled = false;
    };
  }

  feedbackText.oninput = function () {
    activateBtn();
  };
};

const feedbackButton = document.querySelector(".default-btn");
const feedbackText = document.querySelector("#comment-input");
const feedbackForm = document.querySelector("form");

feedbackForm.onsubmit = function (event) {
  event.preventDefault();
  if (feedbackText.value === "") {
    document.querySelector(".alert-container").style.display = "flex";
    feedbackText.style.border = "2px solid #d20094";
  } else {
    document.querySelector(".alert-text").innerText = "Your feedback has been correctly submitted!";
    document.querySelector(".alert-container").style.display = "flex";

    setTimeout(function () {
      window.location.href = "/";
    }, 3000);
  }

  const modalClose = document.querySelector(".alert-close");
  modalClose.onclick = () => {
    document.querySelector(".alert-container").style.display = "none";
    feedbackText.style = "border-top:none";
    feedbackText.style.border = "border-bottom: 2px solid #d20094";
  };
};
