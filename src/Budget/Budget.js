import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../app/MyProvider';
import {
  getBudgetById,
  setBudgetById,
  getAllMonthlyExpensesById,
  addMonthlyExpense,
  removeMonthlyExpense
} from '../services/Firestore';
import { Hero, NumberInput } from '../commonComponents/commonComponents';
import {
  MonthlyExpensesCard,
  MonthyBudgetCard,
  BalanceCard
} from './budgetComponents';
import './Budget.css';

function Budget() {
  const [monthlyBudget, setBudget] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [showAddField, handleShowAddField] = useState(false);
  const [input, setInput] = useState('');
  const context = useContext(Context);
  console.log('context is: ', context)
  useEffect(() => {
    getBudgetById(context.user.budgetId).then(result => {
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
  // console.log('user from context is: ', user);
  return (
    <React.Fragment>
      {input ? (
        <NumberInput handleSubmit={functionObj[input]} />
      ) : (
        <React.Fragment>
          {monthlyBudget && monthlyExpenses && (
            <BalanceCard
              title="Balance"
              monthlyBudget={monthlyBudget}
              monthlyExpenses={monthlyExpenses}
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
