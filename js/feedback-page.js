
let stars = Array.from(document.querySelectorAll('.star'));
console.log(stars)


function resetStars() {
    stars.forEach(function (star) {
        star.classList.remove('selected');
    });
}

window.onload = () => {

    // stars.forEach(star =>
    //     star.onmouseover = function () {
    //         // resetStars();
    //         for (let i = 0; i <= stars.length; i++) {
    //             console.log(i);
    //             star.classList.add('selected');
    //         }


    //     });

    for (let i = 0; i < stars.length; i++) {
        stars[i].onmouseover = function () {
            for (let j = 0; j <= i; j++) {
                stars[j].classList.add("selected")
            }
        }
    }
}




