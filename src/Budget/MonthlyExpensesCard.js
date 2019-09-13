import React, { useState } from 'react';
import { Card } from '../commonComponents/commonComponents';

function MonthlyExpenses({
  monthlyObj,
  handleShowAddField,
  showAddField,
  setMonthlyExpenses,
  removeMonthlyExpense,
  addMonthlyExpense,
  monthlyExpensesId
}) {
  function handleRemove(expense) {
    removeMonthlyExpense(expense, monthlyExpensesId);
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
          <td className="td">
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
            monthlyExpensesId={monthlyExpensesId}
          />
        )}
        {printExenses()}
      </tbody>
    </table>
  );
}

function AddField({
  handleShowAddField,
  setMonthlyExpenses,
  monthlyObj,
  addMonthlyExpense,
  monthlyExpensesId
}) {
  const [newExpenseType, handleNewExpenseType] = useState('');
  const [newExpensePrice, handleNewExpensePrice] = useState('');
  const addExpense = () => {
    let expenseObj = {};
    expenseObj[newExpenseType] = newExpensePrice;
    addMonthlyExpense(expenseObj, monthlyExpensesId).then(() => {
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

export default Card(MonthlyExpenses);
