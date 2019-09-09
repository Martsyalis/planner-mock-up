import React, { useState, useEffect, useContext } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Hero } from '../commonComponents/commonComponents';

const chartData = [
  {
    id: 'coffee',
    value: 200
  },
  {
    id: 'transport',
    value: 100
  },
  {
    id: 'lunch',
    value: 50
  },
  {
    id: 'groceries',
    value: 70
  },
  {
    id: 'dinner',
    value: 300
  }
];

function Charts() {
  return (
    <React.Fragment>
      <Hero title="Charts" />
      <div style={{ height: '18rem' }}>
        <ExpensesPie />
      </div>
    </React.Fragment>
  );
}

function ExpensesPie() {
  return (
    <ResponsivePie
      data={chartData}
      innerRadius={0.1}
      margin={{ bottom: 20, left: 20, right: 20 }}
      padAngle={2}
      cornerRadius={3}
      colors={{ scheme: 'nivo' }}
      borderWidth={2}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      enableRadialLabels={true}
      radialLabelsLinkDiagonalLength={10}
      radialLabelsLinkHorizontalLength={15}
      radialLabelsLinkColor={{ from: 'color', modifiers: [] }}
      sliceLabel={(e) => '$' + e.value}
    />
  );
}

export default Charts;
