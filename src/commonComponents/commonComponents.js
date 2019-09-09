import React, { useState, useEffect } from 'react';
import { MdEdit } from 'react-icons/lib/md';

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
  return class extends React.Component {
    render() {
      const { title, handleEdit } = this.props;
      return (
        <article className="message is-info">
          <div className="message-header">
            <p>{title}</p>
            {handleEdit && (
              <span className="icon" onClick={handleEdit}>
                <MdEdit />
              </span>
            )}
          </div>
          <div className="message-body">
            <WrappedComponent {...this.props} />
          </div>
        </article>
      );
    }
  };
}

function Notification({
  text,
  handleClose,
  timeout = 2000,
  type = 'is-success'
}) {
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

export { Hero, NumberInput, Card, Notification };
