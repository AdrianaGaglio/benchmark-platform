console.log("--- test chart svg ---");

let correctAnswers = 0;
let wrongAnswers = 0;

const correctPercent = 50;
const wrongPercent = 50;

const chartColor = () => {
  const correct = document.querySelector(".donut-segment").attributes[1];
  const bothPercentage = document.querySelector(".donut-segment").attributes[8];
  //funzione per cambiare colori e testi in base al risultato del quiz
  correct.value = `${correctPercent}`;
  bothPercentage.value = `${correctPercent} ${wrongPercent}`;
  const correctText = document.querySelector("#correct-answers span");
  const wrongText = document.querySelector("#wrong-answers span");
  const correctTextP = document.querySelector("#correct-answers p");
  const wrongTextP = document.querySelector("#wrong-answers p");
  //   correctTextP.innerText = `${correctAnswers}/${questionsArray.length} questions`;
  //   wrongTextP.innerText = `${wrongAnswers}/${numQuestion} questions`;
  //   const correctPercent = parseFloat((100 * correctAnswers) / questionsArray.length);
  //   const wrongPercent = parseFloat((100 * wrongAnswers) / questionsArray.length);
  //   correctText.innerHTML = correctPercent.toFixed(2) + "%";
  //   wrongText.innerHTML = wrongPercent.toFixed(2) + "%";
  //   circle.style.background = `conic-gradient(#c1158b 0% ${wrongPercent}%, #00ffff ${wrongPercent}% ${correctPercent}%)`;
  //   failedExams(wrongAnswers);
};

chartColor();
