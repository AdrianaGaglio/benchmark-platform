let stars = Array.from(document.querySelectorAll('.star'));
console.log(stars);

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
        };
    }
};




