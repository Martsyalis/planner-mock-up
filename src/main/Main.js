import React, { PureComponent } from 'react';
import { tileArray } from './tileArray';
import './Main.css';

export default class Main extends PureComponent {
  render() {
    const tilesComponents = tileArray.map((tile, i) => (
      <Tile key={i} type={tile.type} img={tile.img} />
    ));

    return <div className="tile-flex-parent">{tilesComponents}</div>;
  }
}

const Tile = ({ type, img }) => {
  return (
    <div className="box-parent">
      <div className="box">
        <img src={img} />
        <p className="subtitle is-6 type">{type}</p>
      </div>
    </div>
  );
};
