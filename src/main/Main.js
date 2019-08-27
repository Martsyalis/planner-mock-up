import React, { useState } from 'react';
import { tileArray } from './tileArray';
import './Main.css';
import { addExpense } from '../services/Firestore';

function Main() {
  const [type, setType] = useState('');
  const [price, setPrice] = useState(5);
  const [showNumPad, setNumPad] = useState(false);
  function handleSubmit(){
    setNumPad(false);
    addExpense(type, price)
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
        <PriceInput price={price} setPrice={setPrice} handleSubmit={handleSubmit} />
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
        <img src={img} />
        <p className="subtitle is-6 type">{type}</p>
      </div>
    </div>
  );
}

function PriceInput({price, setPrice, handleSubmit}) {
  return (
    <div>
      <input
        autoFocus
        className="input is-rounded"
        type="number"
        placeholder="Rounded Price"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />
      <div className="button is-link" onClick={handleSubmit}>
        Submit
      </div>
    </div>
  );
}

export default Main;
