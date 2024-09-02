const getQuestions = (level) => {
  // genero array di domande in base al livello scelto
  const questionsArray = questions.filter((question) => question.difficulty === level);
  // ciclo l'array di domande per mostrare le possibili risposte
  let index = 0;
  // mostro il testo della domanda
  const questionText = document.getElementById("question-text");
  questionText.innerText = questionsArray[index].question;
  // creo la risposta corretta
  const answerContainer = document.getElementById("answers");
  const correctAnswerWrap = document.createElement("div");
  correctAnswerWrap.className = "answer-wrapper";
  const correctAnswer = document.createElement("div");
  correctAnswer.className = "answer";
  correctAnswer.innerText = questionsArray[index].correct_answer;
  correctAnswerWrap.appendChild(correctAnswer);
  answerContainer.appendChild(correctAnswerWrap);
  correctAnswer.onclick = () => {
    correctAnswer.classList.add("highlighted");
  };
  for (let j = 0; j < questionsArray[index].incorrect_answers.length; j++) {
    const answerWrap = document.createElement("div");
    answerWrap.className = "answer-wrapper";
    const answer = document.createElement("div");
    answer.className = "answer";
    answer.innerText = questionsArray[index].incorrect_answers[j];
    answerWrap.appendChild(answer);
    answerContainer.appendChild(answerWrap);
  }
  index++;
  const nextBtn = document.getElementById("next-question");
  nextBtn.onclick = (event) => {
    event.preventDefault();
  };
};

window.onload = () => {
  getQuestions("easy");
};
