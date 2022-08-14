import React from 'react';

export default function Question(props) {
  const {
    id,
    question,
    correctAnswer,
    userAnswer,
    allAnswers,
    handleClick,
    isAnswered,
    isCorrect,
    isOver,
  } = props;

  return (
    <div className='question'>
      <h3 className='question--title'>{question}</h3>
      <div className='question--answers'>
        <button className='question--answer' onClick={handleClick} id={id}>
          {allAnswers[0]}
        </button>
        <button className='question--answer' onClick={handleClick} id={id}>
          {allAnswers[1]}
        </button>
        <button className='question--answer' onClick={handleClick} id={id}>
          {allAnswers[2]}
        </button>
        <button className='question--answer' onClick={handleClick} id={id}>
          {allAnswers[3]}
        </button>
      </div>
      <hr />
    </div>
  );
}
