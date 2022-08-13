import React, { useState, useEffect } from 'react';
import shuffle from './components/Helpers';
import Question from './components/Question';

function App() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [isStarted, setIsStarted] = useState(true);
  const [isOver, setIsOver] = useState(false);

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
  }, [isOver]);

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

  function checkAnswer(event) {
    const answerIndex = parseInt(event.target.id);

    setAllQuestions((prevQuestions) => {
      const newQuestions = prevQuestions.map((obj) => {
        if (obj.id === answerIndex && obj.correctAnswer === obj.userAnswer) {
          return { ...obj, isCorrect: true };
        } else {
          return obj;
        }
      });
      return newQuestions;
    });
    console.log(allQuestions);
  }

  function checkAllAnswers() {}

  function handleClick(event) {
    storeUserAnswers(event);
    styleSelection(event);
    checkAnswer(event);
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
      handleClick={(event) => handleClick(event)}
    />
  ));

  return (
    <main className='main'>
      {questionsElements}
      {isStarted && !isOver && (
        <button className='check-answers' onClick={checkAllAnswers}>
          Check answers!
        </button>
      )}
    </main>
  );
}

export default App;
