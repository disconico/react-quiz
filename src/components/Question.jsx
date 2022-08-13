import React from 'react';

export default function Question(props) {
  const question = props.question;
  const correctAnswer = props.correctAnswer;
  const otherAnswers = props.otherAnswers;
  const questionID = props.id;
  const handleAnswer = props.handleAnswer;
  const allAnswers = [...otherAnswers, correctAnswer];

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const allAnswersShuffled = shuffle(allAnswers);

  return (
    <div className='question'>
      <h3 className='question--title'>{question}</h3>
      <div className='question--answers'>
        <button
          className='question--answer'
          onClick={handleAnswer}
          id={questionID}
        >
          {allAnswersShuffled[0]}
        </button>
        <button
          className='question--answer'
          onClick={handleAnswer}
          id={questionID}
        >
          {allAnswersShuffled[1]}
        </button>
        <button
          className='question--answer'
          onClick={handleAnswer}
          id={questionID}
        >
          {allAnswersShuffled[2]}
        </button>
        <button
          className='question--answer'
          onClick={handleAnswer}
          id={questionID}
        >
          {allAnswersShuffled[3]}
        </button>
      </div>
    </div>
  );
}
