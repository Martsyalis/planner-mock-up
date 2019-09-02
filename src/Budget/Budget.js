import React, { useState, useEffect } from 'react';
import {
  getBudgetById,
  setBudgetById,
  getAllMonthlyExpensesById,
  addMonthlyExpense
} from '../services/Firestore';
import { Hero, NumberInput, Card } from '../commonComponents/commonComponents';

function Budget() {
  const [monthlyBudget, setBudget] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState({});
  const [input, setInput] = useState('');
  useEffect(() => {
    getBudgetById().then(result => {
      setBudget(result.monthlyBudget);
    });
    getAllMonthlyExpensesById().then(result => {
      setMonthlyExpenses(result);
    });
  }, []);

  //TODO: add spinner
  const functionObj = {
    editMonthlyBudget(budget) {
      setBudgetById(budget).then(() => {
        setBudget(budget);
        setInput('');
      });
    }
  };
  return (
    <React.Fragment>
      {input ? (
        <NumberInput handleSubmit={functionObj[input]} />
      ) : (
        <React.Fragment>
          <MonthyBudgetCard
            title="Budget"
            monthlyBudget={monthlyBudget}
            handleEdit={() => setInput('editMonthlyBudget')}
          />
          <MonthlyExpensesCard
            title="Monthly Expenses"
            monthlyObj={monthlyExpenses}
            setMonthlyExpenses={setMonthlyExpenses}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

const MonthyBudgetCard = Card(({ monthlyBudget }) => (
  <p>Your Monthly Budget is: ${monthlyBudget}</p>
));

const MonthlyExpensesCard = Card(({ monthlyObj, setMonthlyExpenses }) => {
  const [isAdding, handleAdding] = useState(false);
  const [newExpenseType, handleNewExpenseType] = useState('');
  const [newExpensePrice, handleNewExpensePrice] = useState('');

  const printExenses = Object.keys(monthlyObj).map((key, i) => (
    <tr key={i} className="tr">
      <td className="td">{key}</td>
      <td className="td">${monthlyObj[key]}</td>
    </tr>
  ));
  const addExpense = () => {
    let expenseObj = {};
    expenseObj[newExpenseType] = newExpensePrice;
    addMonthlyExpense(expenseObj).then(
      setMonthlyExpenses({ ...monthlyObj, ...expenseObj })
    );
  };
  return (
    <table className="table is-fullwidth">
      <tbody className="tbody">
        {printExenses}
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
      </tbody>
    </table>
  );
});

export default Budget;
