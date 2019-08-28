import React, { useState, useEffect } from 'react';
import { getDailyExpenses } from '../services/Firestore';
import './History.css';

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
    <div className="center-child hero-parent">
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
    <tr key={i} className="tr">
      <td className="td">{expense.date}</td>
      <td className="td">{expense.type}</td>
      <td className="td">${expense.price}</td>
    </tr>
  ));
  return dailyExpensesHistory.length ? (
    <table className="table is-fullwidth">
      <tbody className="tbody">{printExenses}</tbody>
    </table>
  ) : (
    <div>No Expenses yet</div>
  );
}

export default History;
