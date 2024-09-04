let stars = document.querySelectorAll('.star');


function resetStars() {
    stars.forEach(function (star) {
        star.classList.remove('selected');
    });
}

function setStarsUpTo(index) {
    resetStars();
    for (let j = 0; j <= index; j++) {
        stars[j].classList.add("selected");
    }
}

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
};






// document.addEventListener("DOMContentLoaded", function () {
//     const btn = document.querySelector(".default-btn");

//     btn.addEventListener("click", function () {
//         btn.classList.toggle("active-btn");
//     });
// });

const feedbackButton = document.querySelector(".default-btn");
const feedbackText = document.querySelector("#comment-input");


feedbackText.oninput = function (event) {
    const selectedStars = document.querySelectorAll(".selected");

    if (feedbackText.value !== "" && selectedStars.length > 0) {
        feedbackButton.classList.add("active-btn")
    }


}



const feedbackForm = document.querySelector("form")

feedbackForm.onsubmit = function (event) {
    event.preventDefault()
    if (feedbackText.value === "")
        alert("You must leave a feedback before submit")
}


