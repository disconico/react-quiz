import React, { useState, useEffect } from 'react';
import shuffle from './components/Helpers';
import Question from './components/Question';
import Form from './components/Form';

function App() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [score, setScore] = useState(0);
  const [triggerAPI, setTriggerAPI] = useState(0);
  const [userSelection, setUserSelection] = useState({
    difficulty: 'easy',
    numberOfQuestions: '5',
    category: '9',
  });

  useEffect(() => {
    async function getQuestions() {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=${userSelection.numberOfQuestions}&category=${userSelection.category}&difficulty=${userSelection.difficulty}`
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
    console.log('I triggered BWOUHAHAHAHA');
  }, [triggerAPI]);

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
  }

  function styleSelection(event) {
    if (event.target.parentNode.children[0]) {
      event.target.parentNode.children[0].classList.remove('selected');
    }
    if (event.target.parentNode.children[1]) {
      event.target.parentNode.children[1].classList.remove('selected');
    }
    if (event.target.parentNode.children[2]) {
      event.target.parentNode.children[2].classList.remove('selected');
    }
    if (event.target.parentNode.children[3]) {
      event.target.parentNode.children[3].classList.remove('selected');
    }

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

  function playAgain() {
    setIsOver(false);
    setScore(0);
    setIsStarted(false);
    setTriggerAPI((oldCount) => {
      return oldCount + 1;
    });
  }

  function startGame() {
    setIsStarted(true);
  }

  const questionsElements = allQuestions.map((question, index) => (
    <Question
      key={index}
      id={index}
      question={question.question}
      correctAnswer={question.correctAnswer}
      userAnswer={question.userAnswer}
      allAnswers={question.allAnswers}
      isAnswered={question.isAnswered}
      isCorrect={question.isCorrect}
      isOver={isOver}
      handleClick={(event) => handleClick(event)}
    />
  ));

  return (
    <main className='main'>
      {isStarted === false && (
        <div className='main--start'>
          <h1>My Quizzos</h1>
          <h3>Let's get started !</h3>
          <Form
            userSelection={userSelection}
            setUserSelection={setUserSelection}
            setTriggerAPI={setTriggerAPI}
          />
          <p onClick={startGame}>Start Quizzos</p>
        </div>
      )}
      {isStarted === true && (
        <div className='main--questions'>
          {questionsElements}
          {isStarted && !isOver && (
            <div className='main--check'>
              <p className='check-answers' onClick={checkAnswers}>
                Check answers!
              </p>
            </div>
          )}
          {isStarted && isOver && (
            <div className='main--score'>
              <p className='main--score--score'>
                You scored {score}/ {userSelection.numberOfQuestions} correct
                answers
              </p>
              <p className='main--score--new-game' onClick={playAgain}>
                Play again
              </p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default App;
