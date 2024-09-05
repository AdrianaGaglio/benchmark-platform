
let questionNumberInput = document.querySelector('#question-number');
let submitButton = document.querySelector('#submit-btn');

questionNumberInput.addEventListener('input', () => {
    let selectedValue = questionNumberInput.value;


    if (selectedValue >= 5 && selectedValue <= 10) {
        submitButton.classList.add('active-btn');
    } else {
        submitButton.classList.remove('active-btn');
    }
});
