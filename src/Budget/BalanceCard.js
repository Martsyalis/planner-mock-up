import React from 'react';
import moment from 'moment';
import { Card } from '../commonComponents/commonComponents';

function Balance({ monthlyBudget, monthlyExpenses, dailyExpenses }) {
  function monthlyExpensesBalance() {
    return Object.keys(monthlyExpenses).reduce((accumulator, currentValue) => {
      return (
        accumulator - parseFloat(parseFloat(monthlyExpenses[currentValue]))
      );
    }, parseFloat(monthlyBudget));
  }

  function allExpensesBalance() {
    return dailyExpenses.reduce((a, value) => {
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
            <td className="td"> Balance After Monthly Expences</td>
            <td className="td">${monthlyExpensesBalance()}</td>
          </tr>
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
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default Card(Balance);
