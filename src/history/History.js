import React, { useState, useEffect } from 'react';
import { getDailyExpensesById } from '../services/Firestore';
import { Hero } from '../commonComponents/commonComponents';

function History() {
  const [dailyExpensesHistory, handleExpensesHistory] = useState([]);
  useEffect(() => {
    getDailyExpensesById().then(results => {
      handleExpensesHistory(results);
    });
  }, []);
  return (
    <div>
      <Hero title="History" />
      <Table dailyExpensesHistory={dailyExpensesHistory} />
    </div>
  );
}

function Table({ dailyExpensesHistory }) {
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
