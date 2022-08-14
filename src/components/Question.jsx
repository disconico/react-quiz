import React from 'react';

export default function Question(props) {
  const {
    id,
    question,
    correctAnswer,
    userAnswer,
    allAnswers,
    handleClick,
    isOver,
  } = props;

  function setCorrectStyle() {
    if (!isOver) {
      return;
    } else if (isOver) {
      return {
        backgroundColor: '#94D7A2',
        border: 'none',
        fontWeight: 'bold',
      };
    }
  }
  function setIncorrectStyle() {
    if (!isOver) {
      return;
    } else if (isOver) {
      return {
        backgroundColor: '#F8BCBC',
        border: 'none',
        fontWeight: '500',
      };
    }
  }

  const buttonElement = allAnswers.map((answer, index) => (
    <button
      key={index}
      className={
        allAnswers[index] === correctAnswer
          ? 'question--answer correctAnswer'
          : 'question--answer'
      }
      style={
        allAnswers[index] === correctAnswer
          ? setCorrectStyle()
          : allAnswers[index] === userAnswer
          ? setIncorrectStyle()
          : {}
      }
      onClick={handleClick}
      id={id}
    >
      {allAnswers[index]}
    </button>
  ));

  return (
    <div className='question'>
      <h3 className='question--title'>{question}</h3>
      <div className='question--answers'>{buttonElement}</div>
      <hr />
    </div>
  );
}
