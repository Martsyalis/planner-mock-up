import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../app/MyProvider';
import { ResponsivePie } from '@nivo/pie';
import { Hero, Card, Checkbox } from '../commonComponents/commonComponents';
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
      <ExpensesPieCard
        cardBodyHeight="22rem"
        expensesArray={expensesArray}
        title="Expenses Chart"
      />
      <div className="flex-child-column">
        <Checkbox
          isChecked={includeDaily}
          label="Include Daily Expenses"
          handleCheckbox={handleDailyCheckbox}
        />
        <Checkbox
          isChecked={includeMonthly}
          label=" Include Monthly Expenses"
          handleCheckbox={handleMonthlyCheckbox}
        />
      </div>
    </React.Fragment>
  );
}

const ExpensesPieCard = Card(({ expensesArray }) => {
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
});

export default Charts;
