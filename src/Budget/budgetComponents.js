import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Hero, NumberInput, Card } from '../commonComponents/commonComponents';
import { getDailyExpensesById } from '../services/Firestore';

const MonthlyExpensesCard = Card(
  ({
    monthlyObj,
    handleShowAddField,
    showAddField,
    setMonthlyExpenses,
    removeMonthlyExpense,
    addMonthlyExpense
  }) => {
    function handleRemove(expense) {
      removeMonthlyExpense(expense);
      const newMonthlyObj = { ...monthlyObj };
      delete newMonthlyObj[expense];
      setMonthlyExpenses(newMonthlyObj);
    }
    function printExenses() {
      return Object.keys(monthlyObj).map((key, i) => (
        <tr key={i} className="tr">
          <td className="td">{key}</td>
          <td className="td">${monthlyObj[key]}</td>
          {showAddField && (
            <td className="fixed-right">
              <div
                className="delete"
                aria-label="delete"
                onClick={() => handleRemove(key)}
              ></div>
            </td>
          )}
        </tr>
      ));
    }
    return (
      <table className="table is-fullwidth">
        <tbody className="tbody">
          {showAddField && (
            <AddField
              handleShowAddField={handleShowAddField}
              setMonthlyExpenses={setMonthlyExpenses}
              monthlyObj={monthlyObj}
              addMonthlyExpense={addMonthlyExpense}
            />
          )}
          {printExenses()}
        </tbody>
      </table>
    );
  }
);

function AddField({
  handleShowAddField,
  setMonthlyExpenses,
  monthlyObj,
  addMonthlyExpense
}) {
  const [newExpenseType, handleNewExpenseType] = useState('');
  const [newExpensePrice, handleNewExpensePrice] = useState('');
  const addExpense = () => {
    let expenseObj = {};
    expenseObj[newExpenseType] = newExpensePrice;
    addMonthlyExpense(expenseObj).then(() => {
      setMonthlyExpenses({ ...monthlyObj, ...expenseObj });
      handleNewExpenseType('');
      handleNewExpensePrice('');
      handleShowAddField(false);
    });
  };
  return (
    <tr>
      <td>
        <input
          className="input"
          type="string"
          placeholder="type of expense"
          value={newExpenseType}
          onChange={event => handleNewExpenseType(event.target.value)}
        />
      </td>
      <td>
        <input
          className="input"
          type="number"
          placeholder="Monthly Ammount"
          value={newExpensePrice}
          onChange={event => handleNewExpensePrice(event.target.value)}
        />
      </td>
      <td>
        <div className="button is-link" onClick={addExpense}>
          Add
        </div>
      </td>
    </tr>
  );
}

const MonthyBudgetCard = Card(({ monthlyBudget }) => (
  <p>Your Monthly Budget is: ${monthlyBudget}</p>
));

const BalanceCard = Card(({ monthlyBudget, monthlyExpenses }) => {
  const [dailyExpensesHistory, handleExpensesHistory] = useState([]);
  useEffect(() => {
    getDailyExpensesById().then(results => {
      handleExpensesHistory(results);
    });
  }, []);
  function monthlyExpensesBalance() {
    return Object.keys(monthlyExpenses).reduce((accumulator, currentValue) => {
      return (
        accumulator - parseFloat(parseFloat(monthlyExpenses[currentValue]))
      );
    }, parseFloat(monthlyBudget));
  }

  function allExpensesBalance() {
    return dailyExpensesHistory.reduce((a, value) => {
        // checks if the expenses happened this month
      if (moment(value.date).isSame(moment(), 'month')) {
        return parseFloat(a) - parseFloat(value.price);
      }
    }, parseFloat(monthlyExpensesBalance()));
  }
  console.log(allExpensesBalance());
  return (
    <React.Fragment>
      <p>
        Total Balance This Month: $
        {allExpensesBalance() || monthlyExpensesBalance()}
      </p>
      <p>Your Monthly Balance is: ${monthlyExpensesBalance()} </p>
    </React.Fragment>
  );
});

export { MonthlyExpensesCard, MonthyBudgetCard, BalanceCard };
