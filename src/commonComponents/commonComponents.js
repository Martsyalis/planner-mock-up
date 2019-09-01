import React, { useState } from 'react';
import editIcon from '../assets/edit-icon.svg';

function Hero({ title }) {
  return (
    <div className="center-child margin-bottom">
      <h1 className="title">{title}</h1>
    </div>
  );
}

// handle Submit has to take the number as the first parameter
function NumberInput({ handleSubmit }) {
  const [number, setNumber] = useState('')
  return (
    <div>
      <div className="center-child">
        <input
          autoFocus
          className="input is-rounded price-input"
          type="number"
          placeholder="Rounded Price"
          value={number}
          onChange={event => setNumber(event.target.value)}
        />
      </div>
      <div className="center-child">
        <div
          className="button is-link is-rounded number-input-button"
          onClick={() => handleSubmit(number)}
        >
          Submit
        </div>
      </div>
    </div>
  );
}

function Card({ number, handleEdit }) {
  return (
      <article className="message is-info">
        <div className="message-header">
          <p>Budget</p>
          <span className="icon" onClick={handleEdit}>
            <img src={editIcon} />
          </span>
        </div>
        <div className="message-body">
          Your monthly budget is: {number}
        </div>
      </article>
  );
}

export { Hero, NumberInput, Card };
