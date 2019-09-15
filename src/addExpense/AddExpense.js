import React, { useState, useContext } from 'react';
import { Context } from '../app/MyProvider';
import { tileArray } from './tileArray';
import './AddExpense.css';
import { addDailyExpenseById } from '../services/Firestore';
import {
  Hero,
  NumberInput,
  Notification
} from '../commonComponents/commonComponents';

function AddExpense() {
  const [type, setType] = useState('');
  const [showNumPad, setNumPad] = useState(false);
  const [notificationType, setNotificationType] = useState('is-success');
  const [notificationText, setNotificationText] = useState('');
  const { user } = useContext(Context);

  function handleSubmit(price) {
    addDailyExpenseById(type, price, user.uid)
      .then(() => {
        setNotificationText(`Added $${price} for ${type}`);
        setNotificationType('is-success');
      })
      .catch(err => {
        setNotificationText(err.message);
        setNotificationType('is-error');
      });
    setNumPad(false);
  }
  const tilesComponents = tileArray.map((tile, i) => (
    <Tile
      key={i}
      type={tile.type}
      img={tile.img}
      setType={setType}
      setNumPad={setNumPad}
    />
  ));

  return (
    <React.Fragment>
      <Hero title="Expenses" />
      {notificationText && (
        <Notification
          handleClose={() => setNotificationText('')}
          text={notificationText}
          type={notificationType}
        />
      )}
      <div className="main-page">
        {showNumPad ? (
          <NumberInput handleSubmit={handleSubmit} setNumPad={setNumPad} />
        ) : (
          <div className="tile-flex-parent">{tilesComponents}</div>
        )}
      </div>
    </React.Fragment>
  );
}

function Tile({ type, img, setType, setNumPad }) {
  function HandleClick() {
    setType(type);
    setNumPad(true);
  }
  return (
    <div className="box-parent" onClick={() => HandleClick()}>
      <div className="box">
        <img src={img} className="icon-image" />
        <p className="subtitle is-6 type">{type}</p>
      </div>
    </div>
  );
}

export default AddExpense;
