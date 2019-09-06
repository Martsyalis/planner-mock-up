import React, { useState, useContext } from 'react';
import { Context } from '../app/MyProvider';

import { tileArray } from './tileArray';
import './Main.css';
import { addDailyExpenseById } from '../services/Firestore';
import { Hero, NumberInput } from '../commonComponents/commonComponents';

function Main() {
  const [type, setType] = useState('');
  const [showNumPad, setNumPad] = useState(false);
  const {user} = useContext(Context);

  function handleSubmit(price) {
    addDailyExpenseById(type, price, user.uid);
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
      <div className="main-page">
        {showNumPad ? (
          <NumberInput handleSubmit={handleSubmit} />
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

export default Main;
