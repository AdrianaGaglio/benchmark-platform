// indice di selezione della domanda
let questionNumber = 0;
let numQuestion = 0;

// risposte corrette
let correctAnswers = 0;
// risposte sbagliate
let wrongAnswers = 0;

// countdown valore iniziale
let countdownValue = 59;
let countdownInterval;

let questionsArray = [];

const getQuestions = (level, numQuestion) => {
  // genero array di domande in base al livello scelto
  const tempArray = questions.filter((question) => question.difficulty === level);
  tempArray.sort((a, b) => 0.5 - Math.random());
  questionsArray = [...tempArray.slice(0, numQuestion)];
  // confronta i valori dell'array tra di loro e li ordina in base al risultato dell'operazione 0.5 - Math.random()
  // (se negativo il primo valore della comparazione viene considerato minore del secondo, e viceversa )
  // chiamo funzione per la visualizzazione di domanda + risposte
  questionsLoop(questionsArray, questionNumber);
};

// funzione per gestire la rotazione delle domande
const questionsLoop = (index) => {
  // mostro il testo della domanda
  const questionText = document.getElementById("question-text");
  const stringToManipulate = questionsArray[questionNumber].question;
  const lastThreeWords = `<span>${stringToManipulate.split(" ").slice(-3).join(" ")}</span>`;
  const stringArray = stringToManipulate.split(" ");
  for (i = 0; i < 3; i++) {
    stringArray.pop();
  }
  questionText.innerHTML = stringArray.join(" ") + " " + lastThreeWords;
  const answersContainer = document.getElementById("answers");
  // prendo tutte le possibili risposte correlate alla domanda
  const tempAnswersArray = [];
  tempAnswersArray.push(questionsArray[questionNumber].correct_answer);
  for (let i = 0; i < questionsArray[questionNumber].incorrect_answers.length; i++) {
    tempAnswersArray.push(questionsArray[questionNumber].incorrect_answers[i]);
  }
  // inserisco randomicamente le domande nella pagina
  for (let j = 0; j < tempAnswersArray.length; j++) {
    const numOfLoops = tempAnswersArray.length;
    for (let k = 0; k < numOfLoops; k++) {
      const randomIndex = tempAnswersArray.length > 1 ? Math.floor(Math.random() * tempAnswersArray.length) : 0;
      const answerWrap = document.createElement("div");
      answerWrap.className = "answer-wrapper";
      const answer = document.createElement("div");
      answer.className = "answer";
      answer.innerText = tempAnswersArray[randomIndex];
      tempAnswersArray.splice(randomIndex, 1);
      answerWrap.appendChild(answer);
      answersContainer.appendChild(answerWrap);
      // evidenzio la risposta selezionata
      answer.onclick = (event) => {
        if (answer.innerText === questionsArray[questionNumber].correct_answer) {
          correctAnswers += 1;
          // di verde se è la risposta corretta
          answer.classList.add("correct-answer");
        } else {
          wrongAnswers += 1;
          // di rosso se è la risposta sbagliata
          answer.classList.add("wrong-answer");
          // mostro all'utente quale sarebbe stata la risposta corretta
          document.querySelectorAll(".answer").forEach((answer) => {
            if (answer.innerText === questionsArray[questionNumber].correct_answer) {
              answer.classList.add("correct-answer");
            }
          });
        }
        chartColor();
      };
    }
  }
};

const chartColor = () => {
  console.log(correctAnswers);
  console.log(wrongAnswers);
  //funzione per cambiare colori e testi in base al risultato del quiz
  const circle = document.getElementById("outside-circle");
  const correctText = document.querySelector("#correct-answers span");
  const wrongText = document.querySelector("#wrong-answers span");
  const correctTextP = document.querySelector("#correct-answers p");
  const wrongTextP = document.querySelector("#wrong-answers p");
  correctTextP.innerText = `${correctAnswers}/${questionsArray.length} questions`;
  wrongTextP.innerText = `${wrongAnswers}/${numQuestion} questions`;
  const correctPercent = parseFloat((100 * correctAnswers) / questionsArray.length);
  const wrongPercent = parseFloat((100 * wrongAnswers) / questionsArray.length);
  correctText.innerHTML = correctPercent.toFixed(2) + "%";
  wrongText.innerHTML = wrongPercent.toFixed(2) + "%";
  circle.style.background = `conic-gradient(#c1158b 0% ${wrongPercent}%, #00ffff ${wrongPercent}% ${correctPercent}%)`;
  failedExams(wrongAnswers);
};

const failedExams = (wrongAnswers) => {
  // funzione per cambiare testo in caso di esito negativo
  if (wrongAnswers >= questionsArray.length / 2) {
    const textInCircle = document.getElementById("center-text");
    textInCircle.innerHTML = "";
    const examFailed = document.createElement("p");
    examFailed.className = "failed";
    examFailed.innerHTML = "Sorry! <p>You failed the quiz.</p>";
    textInCircle.appendChild(examFailed);
  }
};

// Seleziona l'elemento del countdown
const countdownElement = document.getElementById("counter");

// Funzione per avviare il countdown
const startCountdown = () => {
  const correctAnswerToCheck = Array.from(document.getElementsByClassName("answer"));
  countdownElement.innerHTML = `${countdownValue} <span>seconds remaining</span>`;
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = "100%";
  countdownInterval = setInterval(() => {
    countdownValue--;
    const secondsText = countdownValue > 1 ? "<span>seconds</span>" : "<span>second</span>";
    countdownElement.innerHTML = `${countdownValue} <span>${secondsText} remaining</span> `;
    //decremento la barra del tempo
    const decrement = (countdownValue / 59) * 100;
    progressBar.style.width = decrement + "%";
    if (countdownValue === 0) {
      document.querySelectorAll(".answer").forEach((answer) => {
        if (answer.innerText === questionsArray[questionNumber].correct_answer) {
          answer.classList.add("correct-answer");
        }
      });
    }
    // Se il valore raggiunge 0, resetta il countdown
    if (countdownValue === 0 && questionNumber < questionsArray.length - 1) {
      setTimeout(function () {
        questionNumber++;
        wrongAnswers += 1;
        chartColor();
        resetCountdown();
        document.getElementById("answers").innerHTML = "";
        questionsLoop(questionsArray, questionNumber);
        // contatore domanda infondo alla pagina
        document.querySelector("#current-question").innerText = questionNumber + 1;
      }, 300);
    } else if (countdownValue === 0 && questionNumber === questionsArray.length - 1) {
      correctAnswerToCheck.forEach((answer) => {
        if (answer.innerText === questionsArray[questionNumber].correct_answer) {
          answer.classList.add("correct-answer");
        }
      });
      setTimeout(function () {
        wrongAnswers += 1;
        chartColor();
        document.getElementById("timer-wrapper").style.display = "none";
        document.getElementById("quiz-wrapper").style.display = "none";
        document.querySelector("footer").style.display = "none";
        document.querySelector(".alert-container").style.display = "flex";
        setTimeout(function () {
          document.querySelector(".alert-container").style.display = "none";
          document.getElementById("results-container").style.display = "block";
        }, 4000);
      }, 300);
    }
  }, 1000);
};

// Funzione per resettare il countdown
const resetCountdown = () => {
  clearInterval(countdownInterval); // Ferma l'intervallo attuale
  countdownValue = 59; // Ripristina il valore iniziale
  startCountdown(); // Riavvia il countdown
};

window.onload = () => {
  // mostro le domande successivamente alla scelta del livello di difficoltà
  const levelChoise = document.querySelector("form");
  levelChoise.onsubmit = (event) => {
    event.preventDefault();
    // prelevo il livello di difficoltà scelto
    const chosenLevel = document.getElementById("level").value;
    // prelevo il numero di domande
    numQuestion = document.getElementById("question-number").value;
    if (chosenLevel === " ") {
      // controllo che l'utente abbia scelto un livello di difficoltà
      alert("You must chose a difficulty level!!!");
    } else {
      // mostro l'area dove verranno visualizzate le domande
      document.getElementById("timer-wrapper").style.display = "block";
      document.getElementById("quiz-wrapper").style.display = "block";
      document.querySelector("footer").style.display = "block";
      document.querySelector("#total-questions").innerText = "/ " + numQuestion;
      // nascondo il form di scelta iniziale
      levelChoise.style.display = "none";
      // genero le domande in base al livello scelto
      getQuestions(chosenLevel, numQuestion);
      startCountdown();
      // gestisco il passaggio alla domanda successiva
      answers.addEventListener("click", () => {
        setTimeout(function () {
          questionNumber++;
          resetCountdown();
          document.getElementById("answers").innerHTML = "";
          if (questionNumber === questionsArray.length) {
            document.getElementById("timer-wrapper").style.display = "none";
            document.getElementById("quiz-wrapper").style.display = "none";
            document.querySelector(".alert-container").style.display = "flex";
            setTimeout(function () {
              document.querySelector(".alert-container").style.display = "none";
              document.querySelector("footer").style.display = "none";
              document.getElementById("results-container").style.display = "block";
            }, 4000);
          } else {
            questionsLoop(questionsArray, questionNumber);
            // contatore domanda infondo alla pagina
            document.querySelector("#current-question").innerText = questionNumber + 1;
          }
        }, 300);
      });
      answers.addEventListener("click", resetCountdown());
    }
  };
  const slider = document.getElementById("question-number");
  const tooltip = document.getElementById("tooltip");

  function updateTooltip() {
    tooltip.innerText = slider.value;

    // Calcola la posizione del tooltip in base al valore corrente
    const tooltipWidth = tooltip.offsetWidth; // offsetWidth restituisce la larghezza in pixel dell'elemento tooltip.
    //estrae il valore minimo e massimo del cursore
    const min = slider.min;
    const max = slider.max;
    const value = slider.value;

    const percentage = (value - min) / (max - min); //Calcola la posizione del cursore in termini di percentuale rispetto al suo intervallo totale.
    // Imposta la posizione del tooltip
    tooltip.style.left = `calc(${percentage * 100}% - ${tooltipWidth / 2}px)`; // Imposta la proprietà left del tooltip in modo che il tooltip segua la posizione del cursore.
  } //La funzione calc() viene utilizzata per combinare unità diverse in CSS, come percentuali e pixel

  updateTooltip();
  slider.addEventListener("input", updateTooltip);
};
