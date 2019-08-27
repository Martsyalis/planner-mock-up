import React, { useState } from 'react';
import { tileArray } from './tileArray';
import './Main.css';
import { addDailyExpense } from '../services/Firestore';

function Main() {
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [showNumPad, setNumPad] = useState(false);
  function handleSubmit() {
    addDailyExpense(type, price);
    setNumPad(false);
    setPrice('');
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
  console.log('price is: ', price);
  return (
    <div className="main-page">
      {showNumPad ? (
        <PriceInput
          price={price}
          setPrice={setPrice}
          handleSubmit={handleSubmit}
        />
      ) : (
        <div className="tile-flex-parent">{tilesComponents}</div>
      )}
    </div>
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

function PriceInput({ price, setPrice, handleSubmit }) {
  return (
    <div>
      <div className="center-child">
        <input
          autoFocus
          className="input is-rounded price-input"
          type="number"
          placeholder="Rounded Price"
          value={price}
          onChange={event => setPrice(event.target.value)}
        />
      </div>
      <div className="center-child">
        <div className="button is-link is-rounded price-button" onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </div>
  );
}

export default Main;
