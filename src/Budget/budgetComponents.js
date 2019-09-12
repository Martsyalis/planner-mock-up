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
    addMonthlyExpense,
    monthlyExpensesId
  }) => {
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
              monthlyExpensesId={monthlyExpensesId}
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

const MonthyBudgetCard = Card(({ monthlyBudget }) => (
  <p>Your Monthly Budget is: ${monthlyBudget}</p>
));

const BalanceCard = Card(
  ({ monthlyBudget, monthlyExpenses, dailyExpensesId }) => {
    const [dailyExpensesHistory, handleExpensesHistory] = useState([]);
    useEffect(() => {
      getDailyExpensesById(dailyExpensesId, true).then(results => {
        handleExpensesHistory(results);
      });
    }, []);
    function monthlyExpensesBalance() {
      return Object.keys(monthlyExpenses).reduce(
        (accumulator, currentValue) => {
          return (
            accumulator - parseFloat(parseFloat(monthlyExpenses[currentValue]))
          );
        },
        parseFloat(monthlyBudget)
      );
    }

    function allExpensesBalance() {
      return dailyExpensesHistory.reduce((a, value) => {
        // checks if the expenses happened this month
        if (moment(value.date).isSame(moment(), 'month')) {
          return parseFloat(a) - parseFloat(value.price);
        }
      }, parseFloat(monthlyExpensesBalance()));
    }

    function projectedEndOfMonthBalance() {
      return (
        monthlyExpensesBalance() -
        averegeDailySpendingThisMonth() * daysInCurrentMonth()
      );

      function daysInCurrentMonth() {
        const nextMonth = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        return new Date(year, nextMonth, 0).getDate();
      }
    }

    function averegeDailySpendingThisMonth() {
      let spendingDelta = monthlyExpensesBalance() - allExpensesBalance();
      return Math.round(spendingDelta / new Date().getDate());
    }
    return (
      <React.Fragment>
        <table className="table is-fullwidth">
          <tbody className="tbody">
            <tr className="tr">
              <td className="td"> Remaining Balance This Month</td>
              <td className="td">
                ${allExpensesBalance() || monthlyExpensesBalance()}
              </td>
            </tr>
            <tr className="tr">
              <td className="td"> Averege Daily Spending</td>
              <td className="td ">${averegeDailySpendingThisMonth()}</td>
            </tr>
            <tr className="tr">
              <td className="td"> Projected Balance For This Month</td>
              <td className="td">${projectedEndOfMonthBalance()}</td>
            </tr>
            <tr className="tr">
              <td className="td"> Balance After Monthly Expences</td>
              <td className="td">${monthlyExpensesBalance()}</td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
);

export { MonthlyExpensesCard, MonthyBudgetCard, BalanceCard };
