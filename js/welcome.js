const proceedBtn = document.querySelector(".default-btn");

const checkbox = document.querySelector("input");

checkbox.onclick = () => {
  if (document.querySelector("input").checked) {
    proceedBtn.classList.add("active-btn");
  } else {
    proceedBtn.classList.remove("active-btn");
  }
};

const proceedForm = document.querySelector("form");

proceedForm.onsubmit = (event) => {
  event.preventDefault();
  if (document.querySelector("input").checked) {
    window.location.href = "/benchmark-page.html";
  } else {
    alert("You must mark the promise to answer by yourself before to proceed!");
  }
};
