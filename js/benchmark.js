const getQuestions = (level) => {
  // genero array di domande in base al livello scelto
  const questionsArray = questions.filter((question) => question.difficulty === level);
  // ciclo l'array di domande per mostrare le possibili risposte
  let index = 0;
  // mostro il testo della domanda
  const questionText = document.getElementById("question-text");
  questionText.innerText = questionsArray[index].question;
  const answersContainer = document.getElementById("answers");
  // prendo tutte le possibili risposte correlate alla domanda
  const tempAnswersArray = [];
  tempAnswersArray.push(questionsArray[index].correct_answer);
  for (let i = 0; i < questionsArray[index].incorrect_answers.length; i++) {
    tempAnswersArray.push(questionsArray[index].incorrect_answers[i]);
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
    }
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
