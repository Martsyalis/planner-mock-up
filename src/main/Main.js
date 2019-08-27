import React from 'react';
import { tileArray } from './tileArray';
import './Main.css';
import { addExpense } from '../services/Firestore';


function Main() {
  const tilesComponents = tileArray.map((tile, i) => (
    <Tile key={i} type={tile.type} img={tile.img} />
  ));
  return <div className="tile-flex-parent">{tilesComponents}</div>;
}

function Tile({ type, img }) {
  return (
    <div className="box-parent">
      <div className="box" onClick={() => addExpense(type)}>
        <img src={img} />
        <p className="subtitle is-6 type">{type}</p>
      </div>
    </div>
  );
}

export default Main;
