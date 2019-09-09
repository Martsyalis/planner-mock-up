import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../app/MyProvider';

import { ResponsivePie } from '@nivo/pie';
import { Hero } from '../commonComponents/commonComponents';
import { getDailyExpensesforChart } from '../services/Firestore';

function Charts() {
  const [expensesArray, handleExpensesArray] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    getDailyExpensesforChart(user.uid).then(data => {
      console.log('data is: ', data);
      handleExpensesArray(data);
    });
  }, []);
  return (
    <React.Fragment>
      <Hero title="Charts" />
      <div style={{ height: '18rem' }}>
        <ExpensesPie expensesArray={expensesArray} />
      </div>
    </React.Fragment>
  );
}

function ExpensesPie({ expensesArray }) {
  return (
    <ResponsivePie
      data={expensesArray}
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
      sliceLabel={e => '$' + e.value}
    />
  );
}

export default Charts;
