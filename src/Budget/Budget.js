import React, { useState, useEffect } from 'react';
import {
  getBudgetById,
  setBudgetById,
  getAllMonthlyExpensesById,
  addMonthlyExpense,
  removeMonthlyExpense
} from '../services/Firestore';
import { Hero, NumberInput } from '../commonComponents/commonComponents';
import { MonthlyExpensesCard, MonthyBudgetCard } from './budgetComponents';

function Budget() {
  const [monthlyBudget, setBudget] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState({});
  const [showAddField, handleShowAddField] = useState(false);
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
            showAddField={showAddField}
            handleShowAddField={handleShowAddField}
            addMonthlyExpense={addMonthlyExpense}
            removeMonthlyExpense={removeMonthlyExpense}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Budget;
