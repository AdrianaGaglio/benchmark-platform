// indice di selezione della domanda
let index = 0;

const getQuestions = (level) => {
  // genero array di domande in base al livello scelto
  const questionsArray = questions.filter((question) => question.difficulty === level);
  questionsLoop(questionsArray, index);
};

const questionsLoop = (array, index) => {
  // mostro il testo della domanda
  const questionText = document.getElementById("question-text");
  questionText.innerText = array[index].question;
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
      answer.onclick = () => {
        answer.classList.add("highlighted");
      };
    }
  }
};

const levelChoise = document.querySelector("form");
levelChoise.onsubmit = (event) => {
  event.preventDefault();
  document.getElementById("quiz-wrapper").style.display = "block";
  levelChoise.style.display = "none";
};

window.onload = () => {
  getQuestions("easy");
  answers.addEventListener("click", () => {
    index++;
    document.getElementById("answers").innerHTML = "";
    questionsLoop(
      questions.filter((question) => question.difficulty === "easy"),
      index
    );
  });
};
