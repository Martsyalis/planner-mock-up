import React, { useState, useEffect } from 'react';
import { MdEdit, MdExpandMore, MdExpandLess } from 'react-icons/lib/md';

// import addIcon from '../assets/add-icon.png';

function Hero({ title }) {
  return (
    <div className="flex-child-center margin-bottom">
      <h1 className="title">{title}</h1>
    </div>
  );
}

// handle Submit has to take the number as the first parameter
function NumberInput({ handleSubmit, setNumPad }) {
  const [number, setNumber] = useState('');
  return (
    <div>
      <div className="flex-child-right margin-right-small">
        <p
          className="delete is-large"
          aria-label="delete"
          onClick={() => setNumPad(false)}
        ></p>
      </div>

      <div className="flex-child-center margin-small">
        <input
          autoFocus
          className="input is-rounded price-input"
          type="number"
          placeholder="Rounded Price"
          value={number}
          onChange={event => setNumber(event.target.value)}
        />
      </div>
      <div className="flex-child-center">
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

function Card(WrappedComponent) {
  return props => {
    const { title, handleEdit, cardBodyHeight = '100%' } = props;
    const [isExpanded, handleExpanded] = useState(true);
    return (
      <article className="message is-info">
        <div className="message-header">
          <span className="icon">
            {isExpanded ? (
              <MdExpandLess onClick={e => handleExpanded(!isExpanded)} />
            ) : (
              <MdExpandMore onClick={e => handleExpanded(!isExpanded)} />
            )}
          </span>
          <p>{title}</p>
          <span className="icon">
            {isExpanded && handleEdit && <MdEdit onClick={handleEdit} />}
          </span>
        </div>
        <div
          className={`message-body ${!isExpanded && 'hide'}`}
          style={{ height: cardBodyHeight }}
        >
          <WrappedComponent {...props} />
        </div>
      </article>
    );
  };
}

function Notification({
  text,
  handleClose,
  timeout,
  type = 'is-success'
}) {
  timeout &&
    useEffect(() => {
      setTimeout(() => {
        handleClose();
      }, timeout);
    });
  return (
    <div className={`notification ${type} is-rounded margin-small`}>
      <button className="delete" onClick={handleClose}></button>
      {text}
    </div>
  );
}

function Checkbox({ label, handleCheckbox, isChecked }) {
  return (
    <label className="checkbox">
      {label}{' '}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={e => handleCheckbox(e.target.checked)}
      />
    </label>
  );
}

export { Hero, NumberInput, Card, Notification, Checkbox };
