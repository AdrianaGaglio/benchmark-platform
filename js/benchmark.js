// indice di selezione della domanda
let index = 0;

const getQuestions = (level) => {
  // genero array di domande in base al livello scelto
  const questionsArray = questions.filter((question) => question.difficulty === level);
  // chiamo funzione per la visualizzazione di domanda + risposte
  questionsLoop(questionsArray, index);
};

// funzione per gestire la rotazione delle domande
const questionsLoop = (array, index) => {
  // mostro il testo della domanda
  const questionText = document.getElementById("question-text");
  const stringToManipulate = array[index].question;
  const lastThreeWords = `<span>${stringToManipulate.split(" ").slice(-3).join(" ")}</span>`;
  const stringArray = stringToManipulate.split(" ");
  for (i = 0; i < 3; i++) {
    stringArray.pop();
  }
  questionText.innerHTML = stringArray.join(" ") + " " + lastThreeWords;
  const answersContainer = document.getElementById("answers");
  // prendo tutte le possibili risposte correlate alla domanda
  const tempAnswersArray = [];
  tempAnswersArray.push(array[index].correct_answer);
  for (let i = 0; i < array[index].incorrect_answers.length; i++) {
    tempAnswersArray.push(array[index].incorrect_answers[i]);
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
      answer.onclick = () => {
        answer.classList.add("highlighted");
      };
    }
  }
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
      // nascondo il form di scelta iniziale
      levelChoise.style.display = "none";
      // genero le domande in base al livello scelto
      getQuestions(chosenLevel);
      // gestisco il passaggio alla domanda successiva
      answers.addEventListener("click", () => {
        index++;
        document.getElementById("answers").innerHTML = "";
        const questionsArray = questions.filter((question) => question.difficulty === chosenLevel);
        if (index === questionsArray.length) {
          alert("Domande finite");
        } else {
          questionsLoop(questionsArray, index);
          // contatore domanda infondo alla pagina
          document.querySelector("#current-question").innerText = index + 1;
        }
      });
    }
  };
};
