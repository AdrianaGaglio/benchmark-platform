const chartColor = () => {
  const circle = document.getElementById("outside-circle");
  const correctAnswers = 25;
  const wrongAnswers = 75;
  circle.style.background = `conic-gradient(#c1158b 0% ${wrongAnswers}%, #00ffff ${wrongAnswers}% ${correctAnswers}%)`;
  failedExams(wrongAnswers);
};

const failedExams = (wrongAnswers) => {
  if (wrongAnswers >= 50) {
    const textInCircle = document.getElementById("center-text");
    textInCircle.innerHTML = "";
    const examFailed = document.createElement("p");
    examFailed.className = "failed";
    examFailed.innerHTML = "Sorry! <p>You failed the quiz.</p>";
    textInCircle.appendChild(examFailed);
  }
};

window.onload = () => {
  chartColor();
};
