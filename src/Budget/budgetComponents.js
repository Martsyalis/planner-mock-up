import React, { useState, useEffect } from 'react';
import { Hero, NumberInput, Card } from '../commonComponents/commonComponents';

const MonthlyExpensesCard = Card(
  ({
    monthlyObj,
    handleShowAddField,
    showAddField,
    setMonthlyExpenses,
    removeMonthlyExpense
  }) => {
    function handleRemove(expense) {
      removeMonthlyExpense(expense);
      const newMonthlyObj = { ...monthlyObj };
      delete newMonthlyObj[expense];
      setMonthlyExpenses(newMonthlyObj);
    }
    function printExenses() {
      console.log('we are printing');
      return Object.keys(monthlyObj).map((key, i) => (
        <tr key={i} className="tr">
          <td className="td">{key}</td>
          <td className="td">${monthlyObj[key]}</td>
          <td>
            <div
              className="delete"
              aria-label="delete"
              onClick={() => handleRemove(key)}
            ></div>
          </td>
        </tr>
      ));
    }
    return (
      <table className="table is-fullwidth">
        <tbody className="tbody">
          {showAddField ? (
            <AddField
              handleShowAddField={handleShowAddField}
              setMonthlyExpenses={setMonthlyExpenses}
              monthlyObj={monthlyObj}
              addMonthlyExpense={addMonthlyExpense}
            />
          ) : (
            printExenses()
          )}
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

export { MonthlyExpensesCard, MonthyBudgetCard };
