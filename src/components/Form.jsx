import React, { useState } from 'react';

export default function Form(props) {
  const { userSelection, setUserSelection, setTriggerAPI } = props;

  function handleChange(event) {
    const { name, value } = event.target;
    setUserSelection((prevSelection) => ({
      ...prevSelection,
      [name]: value,
    }));
    setTriggerAPI((oldCount) => {
      return oldCount + 1;
    });
  }

  return (
    <div className='form--selection'>
      <div className='select'>
        <select
          value={userSelection.difficulty}
          onChange={handleChange}
          name='difficulty'
        >
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='hard'>Hard</option>
        </select>
        <span className='focus'></span>
      </div>
      <div className='select'>
        <select
          value={userSelection.numberOfQuestions}
          onChange={handleChange}
          name='numberOfQuestions'
        >
          <option value='1'>1</option>
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='20'>20</option>
        </select>
        <span className='focus'></span>
      </div>
      <div className='select'>
        <select
          value={userSelection.category}
          onChange={handleChange}
          name='category'
        >
          <option value='9'>General knowledge</option>
          <option value='21'>Sport</option>
          <option value='11'>Films</option>
          <option value='25'>Art</option>
          <option value='23'>History</option>
        </select>
        <span className='focus'></span>
      </div>
    </div>
  );
}
