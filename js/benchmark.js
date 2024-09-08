// indice di selezione della domanda
let questionNumber = 0;
let numQuestion = 0;

// risposte corrette
let correctAnswers = 0;
// risposte sbagliate
let wrongAnswers = 0;

// countdown valore iniziale
let countdownValue = 10;
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

// genera il titolo della domanda
const getQuestionTitle = () => {
  const questionText = document.getElementById("question-text");
  const stringToManipulate = questionsArray[questionNumber].question;
  const lastThreeWords = `<span>${stringToManipulate.split(" ").slice(-3).join(" ")}</span>`;
  const stringArray = stringToManipulate.split(" ");
  for (i = 0; i < 3; i++) {
    stringArray.pop();
  }
  questionText.innerHTML = stringArray.join(" ") + " " + lastThreeWords;
  return questionText.innerHTML;
};

// segna risposta corretta e sbagliata e aggiorna il punteggio
const checkAnswer = () => {
  const answerWraps = document.querySelectorAll(".answer-wrapper");
  answerWraps.forEach((answerWrap) => {
    answerWrap.onclick = () => {
      const answer = answerWrap.childNodes[0];
      if (answer.innerText === questionsArray[questionNumber].correct_answer) {
        correctAnswers += 1;
        // evidenzia di verde se corretta
        answer.classList.add("correct-answer");
      } else {
        // evidenzia di rosso se sbagliata
        answer.classList.add("wrong-answer");
        wrongAnswers += 1;
        // e fa vedere qual è quella corretta
        document.querySelectorAll(".answer").forEach((answer) => {
          if (answer.innerText === questionsArray[questionNumber].correct_answer) {
            answer.classList.add("correct-answer");
          }
        });
      }
      chartColor();
    };
    // evidenzio risposta corretta e gestisco punteggio allo scadere del tempo
    if (answerWrap.childNodes[0].innerText === questionsArray[questionNumber].correct_answer && countdownValue === 0) {
      answerWrap.childNodes[0].classList.add("correct-answer");
      wrongAnswers += 1;
    }
  });
};

// funzione per mostare le risposte correllate alla domanda corrente
const getAnswers = () => {
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
      checkAnswer();
    }
  }
};

// funzione per gestire la rotazione delle domande
const questionsLoop = (index) => {
  // titolo domanda
  const questionText = document.getElementById("question-text");
  questionText.innerHTML = getQuestionTitle();
  // risposte
  getAnswers();
  document.querySelector("#current-question").innerText = questionNumber + 1;
};

// funzione donut chart e testi risultato
const chartColor = () => {
  // testi e percentuali risposte corrette / sbagliate
  const correctText = document.querySelector("#correct-answers span");
  const wrongText = document.querySelector("#wrong-answers span");
  const correctTextP = document.querySelector("#correct-answers p");
  const wrongTextP = document.querySelector("#wrong-answers p");
  // genero il testo che mostra quante domande giuste su tot (dinamico) domande
  correctTextP.innerText = `${correctAnswers}/${questionsArray.length} questions`;
  // genero il testo che mostra quante domande sbagliate su tot (dinamico) domande
  wrongTextP.innerText = `${wrongAnswers}/${numQuestion} questions`;
  // calcolo delle percentuali
  const correctPercent = parseFloat((100 * correctAnswers) / questionsArray.length);
  const wrongPercent = parseFloat((100 * wrongAnswers) / questionsArray.length);
  // testo se il quiz è superato
  correctText.innerHTML = correctPercent.toFixed(2) + "%";
  // testo se il quiz non è superato
  wrongText.innerHTML = wrongPercent.toFixed(2) + "%";
  // gestisco la colorazione del grafico
  const correct = document.querySelector(".donut-segment").attributes[1];
  const bothPercentage = document.querySelector(".donut-segment").attributes[8];
  correct.value = `${correctPercent}`;
  bothPercentage.value = `${correctPercent} ${wrongPercent}`;
  failedExams(wrongAnswers);
};

// genera testo esame non superato
const failedExams = (wrongAnswers) => {
  // funzione per cambiare testo in caso di esito negativo
  if (wrongAnswers >= questionsArray.length / 2) {
    const textInCircle = document.getElementById("center-text");
    textInCircle.innerHTML = "";
    const examFailed = document.createElement("p");
    examFailed.id = "failed";
    examFailed.innerHTML = "You failed the test. You can practice more and try again to perform the test.";
    textInCircle.appendChild(examFailed);
  }
};

// Seleziona l'elemento del countdown
const countdownElement = document.getElementById("counter");

// Funzione per avviare il countdown
const startCountdown = () => {
  const correctAnswerToCheck = Array.from(document.getElementsByClassName("answer"));
  countdownElement.innerHTML = `${countdownValue} <span>seconds remaining</span>`;
  countdownInterval = setInterval(() => {
    countdownValue--;
    const secondsText = countdownValue > 1 ? "<span>seconds</span>" : "<span>second</span>";
    countdownElement.innerHTML = `${countdownValue} <span>${secondsText} remaining</span> `;
    // decremento la barra del tempo
    const decrement = (countdownValue / 59) * 100;
    const currentTime = document.querySelector(".time-segment").attributes[1];
    const currentAndRemaining = document.querySelector(".time-segment").attributes[8];
    currentTime.value = `${decrement}`;
    currentAndRemaining.value = `${decrement} ${100 - decrement}`;
    // // Se il valore raggiunge 0, resetta il countdown
    if (countdownValue === 0) {
      checkAnswer();
    }
    if (countdownValue === 0 && questionNumber < questionsArray.length - 1) {
      questionNumber++;
      setTimeout(function () {
        chartColor();
        resetCountdown();
        document.getElementById("answers").innerHTML = "";
        questionsLoop(questionsArray, questionNumber);
      }, 300);
    } else if (countdownValue === 0 && questionNumber === questionsArray.length - 1) {
      setTimeout(function () {
        chartColor();
        document.getElementById("timer-wrapper").style.display = "none";
        document.getElementById("quiz-wrapper").style.display = "none";
        document.querySelector("footer").style.display = "none";
        document.querySelector(".alert-container").style.display = "flex";
        setTimeout(function () {
          document.querySelector(".alert-container").style.display = "none";
          document.getElementById("results-container").style.display = "block";
        }, 2000);
      }, 300);
    }
  }, 1000);
};

// Funzione per resettare il countdown
const resetCountdown = () => {
  clearInterval(countdownInterval); // Ferma l'intervallo attuale
  countdownValue = 10; // Ripristina il valore iniziale
  startCountdown(); // Riavvia il countdown
};

const slider = document.getElementById("question-number");
const tooltip = document.getElementById("tooltip");

// tooltip barra selezione numero domande
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

window.onload = () => {
  // mostro le domande successivamente alla scelta del livello di difficoltà
  const levelChoise = document.querySelector("form");
  levelChoise.onsubmit = (event) => {
    event.preventDefault();
    // prelevo il livello di difficoltà scelto
    const chosenLevel = document.getElementById("level").value;
    // prelevo il numero di domande
    numQuestion = document.getElementById("question-number").value;
    // mostro l'area dove verranno visualizzate le domande
    document.getElementById("timer-wrapper").style.display = "flex";
    document.getElementById("quiz-wrapper").style.display = "block";
    document.querySelector("footer").style.display = "block";
    document.querySelector("#total-questions").innerText = "/ " + numQuestion;
    // nascondo il form di scelta iniziale
    levelChoise.style.display = "none";
    // genero le domande in base al livello scelto
    getQuestions(chosenLevel, numQuestion);
    startCountdown();
  };

  // gestisco il passaggio alla domanda successiva
  answers.addEventListener("click", () => {
    checkAnswer();
    questionNumber++;
    setTimeout(function () {
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
        }, 2000);
      } else {
        resetCountdown();
        questionsLoop(questionsArray, questionNumber);
      }
    }, 300);
  });

  updateTooltip();
  slider.addEventListener("input", updateTooltip);
};
