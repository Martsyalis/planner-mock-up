import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../app/MyProvider';
import {
  getBudgetById,
  setBudgetById,
  getAllMonthlyExpensesById,
  addMonthlyExpense,
  removeMonthlyExpense
} from '../services/Firestore';
import { Hero, NumberInput, Card } from '../commonComponents/commonComponents';
import MonthlyExpensesCard from './MonthlyExpensesCard';
import BalanceCard from './BalanceCard';
import './Budget.css';

function Budget() {
  const [monthlyBudget, setBudget] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [showAddField, handleShowAddField] = useState(false);
  const [input, setInput] = useState('');
  const { user } = useContext(Context);

  useEffect(() => {
    getBudgetById(user.uid).then(result => {
      setBudget(result.monthlyBudget);
    });
    getAllMonthlyExpensesById(user.uid).then(result => {
      setMonthlyExpenses(result);
    });
  }, []);

  function handleEditMonthlyExpenses() {
    handleShowAddField(!showAddField);
  }

  const functionObj = {
    editMonthlyBudget(budget) {
      setBudgetById(budget, user.uid).then(() => {
        setBudget(budget);
        setInput('');
      });
    }
  };
  const displayBalanceCard = monthlyBudget && monthlyExpenses;
  return (
    <React.Fragment>
      {input ? (
        <NumberInput handleSubmit={functionObj[input]} />
      ) : (
        <React.Fragment>
          <Hero title={'Budget'} />
          {!!displayBalanceCard && (
            <BalanceCard
              title="Balance"
              monthlyBudget={monthlyBudget}
              monthlyExpenses={monthlyExpenses}
              dailyExpensesId={user.uid}
            />
          )}
          <MonthyBudgetCard
            title="Budget"
            monthlyBudget={monthlyBudget}
            handleEdit={() => setInput('editMonthlyBudget')}
          />

          <MonthlyExpensesCard
            title="Monthly Expenses"
            monthlyObj={monthlyExpenses}
            setMonthlyExpenses={setMonthlyExpenses}
            showAddField={showAddField}
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
