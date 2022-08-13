import React, { useState, useEffect } from 'react';
import Question from './components/Question';

function App() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [isOver, setIsOver] = useState(false);
  const userAnswers = [
    'noAnswer',
    'noAnswer',
    'noAnswer',
    'noAnswer',
    'noAnswer',
  ];
  const correctAnswers = [];

  useEffect(() => {
    async function getQuestions() {
      const res = await fetch(
        'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple'
      );
      const data = await res.json();
      const dataResults = data.results;

      setAllQuestions(dataResults);
    }
    getQuestions();
  }, []);

  function storeAnswers(array) {
    array.forEach((question, index) =>
      correctAnswers.push({
        id: array.indexOf(array[index]),
        correctAnswer: array[index].correct_answer,
      })
    );
  }

  useEffect(() => {
    storeAnswers(allQuestions);
  }, [allQuestions]);

  function storeUserAnswers(event) {
    const userTargetAnswer = event.target.innerText;
    const answerIndex = parseInt(event.target.id);

    userAnswers.splice(answerIndex, 1, userTargetAnswer);
  }

  function styleSelection(event) {
    event.target.parentNode.children[0].classList.remove('selected');
    event.target.parentNode.children[1].classList.remove('selected');
    event.target.parentNode.children[2].classList.remove('selected');
    event.target.parentNode.children[3].classList.remove('selected');

    event.currentTarget.classList.add('selected');
  }

  function handleClick(event) {
    storeUserAnswers(event);
    styleSelection(event);
  }

  function checkResult() {
    let score = 0;
    for (let i = 0; i < 5; i++) {
      if (correctAnswers[i].correctAnswer === userAnswers[i]) {
        score += 1;
      }
    }
    console.log(score);
    setIsOver(true);
  }

  const questionsElements = allQuestions.map((question, index) => (
    <Question
      key={index}
      id={index}
      question={question.question}
      correctAnswer={question.correct_answer}
      otherAnswers={question.incorrect_answers}
      handleAnswer={(event) => handleClick(event)}
    />
  ));

  return (
    <main className='main'>
      {questionsElements}
      <button className='check-answers' onClick={checkResult}>
        Check answers!
      </button>
    </main>
  );
}

export default App;
