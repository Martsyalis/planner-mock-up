import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../app/MyProvider';

import { ResponsivePie } from '@nivo/pie';
import { Hero } from '../commonComponents/commonComponents';
import { getExpensesforChart } from '../services/Firestore';

function Charts() {
  const [expensesArray, handleExpensesArray] = useState([]);
  const [includeMonthly, handleIncludeMonthly] = useState(false);
  const [includeDaily, handleIncludeDaily] = useState(true);
  const { user } = useContext(Context);

  useEffect(() => {
    getExpensesforChart(user.uid, includeDaily, includeMonthly).then(data =>
      handleExpensesArray(data)
    );
  }, []);

  function handleMonthlyCheckbox(checked) {
    handleIncludeMonthly(checked);
    getExpensesforChart(user.uid, includeDaily, checked).then(data => {
      handleExpensesArray(data);
    });
  }

  function handleDailyCheckbox(checked) {
    handleIncludeDaily(checked);
    getExpensesforChart(user.uid, checked, includeMonthly).then(data => {
      handleExpensesArray(data);
    });
  }

  return (
    <React.Fragment>
      <Hero title="Charts" />
      <div style={{ height: '18rem' }}>
        <ExpensesPie expensesArray={expensesArray} />
        <div className="flex-child-column">
          <label className="checkbox">
            Include Daily Expenses{' '}
            <input
              type="checkbox"
              checked={includeDaily}
              onChange={e => handleDailyCheckbox(e.target.checked)}
            />
          </label>
          <label className="checkbox">
            Include Monthly Expenses{' '}
            <input
              type="checkbox"
              checked={includeMonthly}
              onChange={e => handleMonthlyCheckbox(e.target.checked)}
            />
          </label>
        </div>
      </div>
    </React.Fragment>
  );
}

function ExpensesPie({ expensesArray, startAngle, endAngle }) {
  return (
    <ResponsivePie
      data={expensesArray}
      innerRadius={0.1}
      margin={{ bottom: 30, left: 20, right: 20, top: 30 }}
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
