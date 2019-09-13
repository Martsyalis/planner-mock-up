import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../app/MyProvider';
import {
  getBudgetById,
  setBudgetById,
  getAllMonthlyExpensesById,
  addMonthlyExpense,
  removeMonthlyExpense,
  getDailyExpensesById
} from '../services/Firestore';
import {
  Hero,
  NumberInput,
  Card,
  Notification
} from '../commonComponents/commonComponents';
import MonthlyExpensesCard from './MonthlyExpensesCard';
import BalanceCard from './BalanceCard';
import './Budget.css';

function Budget() {
  const [monthlyBudget, setBudget] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [dailyExpenses, handleDailyExpenses] = useState([]);
  const [showAddField, handleShowAddField] = useState(false);
  const [showNumInput, handleshowNumInput] = useState(false);
  const [errorNotification, setErrorNotification] = useState('');
  const { user } = useContext(Context);

  useEffect(() => {
    getBudgetById(user.uid)
      .then(result => {
        setBudget(result.monthlyBudget);
      })
      .catch(err => {
        setErrorNotification(err.message);
      });
    getAllMonthlyExpensesById(user.uid)
      .then(result => {
        setMonthlyExpenses(result);
      })
      .catch(err => {
        setErrorNotification(err.message);
      });
    getDailyExpensesById(user.uid)
      .then(results => {
        handleDailyExpenses(results);
      })
      .catch(err => {
        setErrorNotification(err.message);
      });
  }, []);

  function handleEditMonthlyExpenses() {
    handleShowAddField(!showAddField);
  }

  function handleNewMonthlyBudget(budget) {
    setBudgetById(budget, user.uid)
      .then(() => {
        setBudget(budget);
        handleshowNumInput(false);
      })
      .catch(err => {
        setErrorNotification(err.message);
      });
  }

  const displayBalanceCard = monthlyBudget && monthlyExpenses;
  return (
    <React.Fragment>
      {errorNotification && (
        <Notification
          text={errorNotification}
          handleClose={() => setErrorNotification('')}
          type="is-danger"
        />
      )}
      {showNumInput ? (
        <NumberInput handleSubmit={handleNewMonthlyBudget} />
      ) : (
        <React.Fragment>
          <Hero title={'Budget'} />
          {!!displayBalanceCard && (
            <BalanceCard
              title="Balance"
              monthlyBudget={monthlyBudget}
              monthlyExpenses={monthlyExpenses}
              dailyExpenses={dailyExpenses}
            />
          )}
          <MonthyBudgetCard
            title="Budget"
            monthlyBudget={monthlyBudget}
            handleEdit={() => handleshowNumInput(true)}
          />

          <MonthlyExpensesCard
            title="Monthly Expenses"
            monthlyObj={monthlyExpenses}
            setMonthlyExpenses={setMonthlyExpenses}
            showAddField={showAddField}
            handleShowAddField={handleShowAddField}
            handleEdit={handleEditMonthlyExpenses}
            addMonthlyExpense={addMonthlyExpense}
            removeMonthlyExpense={removeMonthlyExpense}
            monthlyExpensesId={user.uid}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

const MonthyBudgetCard = Card(({ monthlyBudget }) => (
  <p>Your Monthly Budget is: ${monthlyBudget}</p>
));

export default Budget;
