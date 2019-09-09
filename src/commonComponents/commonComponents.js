import React, { useState } from 'react';
import { MdEdit } from 'react-icons/lib/md';
import { FaPlusCircle } from 'react-icons/lib/fa';

// import addIcon from '../assets/add-icon.png';

function Hero({ title }) {
  return (
    <div className="center-child margin-bottom">
      <h1 className="title">{title}</h1>
    </div>
  );
}

// handle Submit has to take the number as the first parameter
function NumberInput({ handleSubmit }) {
  const [number, setNumber] = useState('');
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

function Card(WrappedComponent) {
  return class extends React.Component {
    render() {
      const {
        title,
        handleEdit,
        handleShowAddField,
        showAddField
      } = this.props;
      return (
        <article className="message is-info">
          <div className="message-header">
            <p>{title}</p>
            {handleEdit ? (
              <span className="icon" onClick={handleEdit}>
                <MdEdit />
              </span>
            ) : (
              <span
                className="icon"
                onClick={() => handleShowAddField(!showAddField)}
              >
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

export { Hero, NumberInput, Card };
