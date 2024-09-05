// indice di selezione della domanda
let questionNumber = 0;

// risposte corrette
let correctAnswers = 0;
// risposte sbagliate
let wrongAnswers = 0;

// countdown valore iniziale
let countdownValue = 10;
let countdownInterval;

let questionsArray = [];

const getQuestions = (level) => {
  // genero array di domande in base al livello scelto
  const tempArray = questions.filter((question) => question.difficulty === level);
  questionsArray = [...tempArray];
  // confronta i valori dell'array tra di loro e li ordina in base al risultato dell'operazione 0.5 - Math.random()
  // (se negativo il primo valore della comparazione viene considerato minore del secondo, e viceversa )
  // questionsArray.sort((a, b) => 0.5 - Math.random());
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
      };
    }
  }
  chartColor();
};

const chartColor = () => {
  //funzione per cambiare colori e testi in base al risultato del quiz
  const circle = document.getElementById("outside-circle");
  const correctText = document.querySelector("#correct-answers span");
  const wrongText = document.querySelector("#wrong-answers span");
  const correctTextP = document.querySelector("#correct-answers p");
  const wrongTextP = document.querySelector("#wrong-answers p");
  correctTextP.innerText = correctAnswers + "/10 questions";
  wrongTextP.innerText = wrongAnswers + "/10 questions";
  correctText.innerHTML = (100 * correctAnswers) / questionsArray.length + "%";
  wrongText.innerHTML = (100 * wrongAnswers) / questionsArray.length + "%";
  circle.style.background = `conic-gradient(#c1158b 0% ${wrongAnswers}%, #00ffff ${wrongAnswers}% ${correctAnswers}%)`;
  failedExams(wrongAnswers);
};

const failedExams = (wrongAnswers) => {
  // funzione per cambiare testo in caso di esito negativo
  if (wrongAnswers >= 50) {
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
  countdownElement.textContent = countdownValue;
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = "100%";
  countdownInterval = setInterval(() => {
    countdownValue--;
    countdownElement.textContent = countdownValue;
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
        resetCountdown();
        document.getElementById("answers").innerHTML = "";
        questionsLoop(questionsArray, questionNumber);
        // contatore domanda infondo alla pagina
        document.querySelector("#current-question").innerText = questionNumber + 1;
      }, 500);
    } else if (countdownValue === 0 && questionNumber === questionsArray.length - 1) {
      correctAnswerToCheck.forEach((answer) => {
        if (answer.innerText === questionsArray[questionNumber].correct_answer) {
          answer.classList.add("correct-answer");
        }
      });
      setTimeout(function () {
        alert("Domande finite");
        wrongAnswers += 1;
        document.getElementById("quiz-wrapper").style.display = "none";
        document.querySelector("footer").style.display = "none";
        document.getElementById("results-container").style.display = "block";
      }, 500);
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
    if (chosenLevel === " ") {
      // controllo che l'utente abbia scelto un livello di difficoltà
      alert("You must chose a difficulty level!!!");
    } else {
      // mostro l'area dove verranno visualizzate le domande
      document.getElementById("quiz-wrapper").style.display = "block";
      document.querySelector("footer").style.display = "block";
      // nascondo il form di scelta iniziale
      levelChoise.style.display = "none";
      // genero le domande in base al livello scelto
      getQuestions(chosenLevel);
      startCountdown();
      // gestisco il passaggio alla domanda successiva
      answers.addEventListener("click", () => {
        setTimeout(function () {
          questionNumber++;
          resetCountdown();
          document.getElementById("answers").innerHTML = "";
          if (questionNumber === questionsArray.length) {
            alert("Domande finite");
            document.getElementById("quiz-wrapper").style.display = "none";
            document.querySelector("footer").style.display = "none";
            document.getElementById("results-container").style.display = "block";
          } else {
            questionsLoop(questionsArray, questionNumber);
            // contatore domanda infondo alla pagina
            document.querySelector("#current-question").innerText = questionNumber + 1;
          }
        }, 500);
      });
      answers.addEventListener("click", resetCountdown());
    }
  };
};
