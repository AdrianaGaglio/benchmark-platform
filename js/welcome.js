const proceedBtn = document.querySelector(".default-btn");

const checkbox = document.querySelector("input");

checkbox.onclick = () => {
  if (document.querySelector("input").checked) {
    proceedBtn.classList.add("active-btn");
  } else {
    proceedBtn.classList.remove("active-btn");
  }
};

proceedBtn.onclick = () => {
  if (document.querySelector("input").checked) {
    window.location.href = "/benchmark-page.html";
  } else {
    alert("You must mark the promise to answer by yourself before to proceed!");
  }
};
