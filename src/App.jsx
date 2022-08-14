import React, { useState, useEffect } from 'react';
import shuffle from './components/Helpers';
import Question from './components/Question';

function App() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [isStarted, setIsStarted] = useState(true);
  const [isOver, setIsOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function getQuestions() {
      const res = await fetch(
        'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple'
      );
      const data = await res.json();
      const dataResults = data.results;
      const questions = [];

      dataResults.forEach((result, index) => {
        const allAnswers = [...result.incorrect_answers, result.correct_answer];
        const currentQuestion = {
          id: index,
          question: result.question,
          correctAnswer: result.correct_answer,
          userAnswer: '',
          allAnswers: shuffle(allAnswers),
          isAnswered: false,
          isCorrect: false,
        };
        questions.push(currentQuestion);
        return questions;
      });

      setAllQuestions(questions);
    }
    getQuestions();
  }, []);

  function storeUserAnswers(event) {
    const userTargetAnswer = event.target.innerText;
    const answerIndex = parseInt(event.target.id);

    setAllQuestions((prevQuestions) => {
      const newQuestions = prevQuestions.map((obj) => {
        if (obj.id === answerIndex) {
          return { ...obj, userAnswer: userTargetAnswer, isAnswered: true };
        } else {
          return obj;
        }
      });
      return newQuestions;
    });
    console.log(allQuestions);
  }

  function styleSelection(event) {
    event.target.parentNode.children[0].classList.remove('selected');
    event.target.parentNode.children[1].classList.remove('selected');
    event.target.parentNode.children[2].classList.remove('selected');
    event.target.parentNode.children[3].classList.remove('selected');

    event.currentTarget.classList.add('selected');
  }

  function checkIfCorrect(event) {
    const answerIndex = parseInt(event.target.id);

    setAllQuestions((prevQuestions) => {
      const newQuestions = prevQuestions.map((obj) => {
        if (obj.id === answerIndex && obj.correctAnswer === obj.userAnswer) {
          return { ...obj, isCorrect: true };
        } else if (
          obj.id === answerIndex &&
          obj.correctAnswer != obj.userAnswer
        ) {
          return { ...obj, isCorrect: false };
        } else {
          return obj;
        }
      });
      return newQuestions;
    });
  }

  useEffect(() => {
    setScore(() => {
      let newScore = 0;
      allQuestions.forEach((obj) => obj.isCorrect && newScore++);
      console.log(newScore);
      return newScore;
    });
  }, [allQuestions]);

  function handleClick(event) {
    if (!isOver) {
      storeUserAnswers(event);
      styleSelection(event);
      checkIfCorrect(event);
    }
  }

  function checkAnswers() {
    setIsOver(true);
  }

  const questionsElements = allQuestions.map((question, index) => (
    <Question
      key={index}
      id={index}
      question={question.question}
      correctAnswer={question.correctAnswer}
      allAnswers={question.allAnswers}
      isAnswered={question.isAnswered}
      isCorrect={question.isCorrect}
      isOver={isOver}
      handleClick={(event) => handleClick(event)}
    />
  ));

  return (
    <main className='main'>
      <div className='main--questions'>
        {questionsElements}
        {isStarted && !isOver && (
          <div className='main--check'>
            <button className='check-answers' onClick={checkAnswers}>
              Check answers!
            </button>
          </div>
        )}
        {isStarted && isOver && (
          <div className='main--score'>
            <p className='main--score--score'>
              You scored {score}/5 correct answers
            </p>
            <button className='main--score--new-game'>Play again</button>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
