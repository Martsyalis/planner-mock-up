import React, { useState, useEffect } from 'react';
import { getDailyExpenses } from '../services/Firestore';

function History() {
  return (
    <div>
      <HistoryHero />
      <Table />
    </div>
  );
}

function HistoryHero() {
  return (
    <div className="center-child">
      <h1 className="title">History</h1>
    </div>
  );
}

function Table() {
  const [dailyExpensesHistory, handleExpensesHistory] = useState([]);
  useEffect(() => {
    if (dailyExpensesHistory.length) return;
    getDailyExpenses().then(results => {
      handleExpensesHistory(results);
    });
  });
  const printExenses = dailyExpensesHistory.map((expense, i) => (
    <div key={i}>
      <p>{expense.type}</p>
    </div>
  ));
  return <div>{dailyExpensesHistory.length && printExenses}</div>;
}

export default History;
