import React, { useState, useEffect } from 'react';
import {
  getBudgetById,
  setBudgetById,
  getAllMonthlyExpensesById
} from '../services/Firestore';
import { Hero, NumberInput, Card } from '../commonComponents/commonComponents';

function Budget() {
  const [monthlyBudget, setBudget] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState({})
  const [input, setInput] = useState('');
  useEffect(() => {
    getBudgetById().then(result => {
      setBudget(result.monthlyBudget);
    });
    getAllMonthlyExpensesById().then(result =>{
      setMonthlyExpenses(result)
    })
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
          <Hero title="Budget" />
          <MonthyBudgetCard
            title="Budget"
            monthlyBudget={monthlyBudget}
            handleEdit={() => setInput('editMonthlyBudget')}
          />
          <MonthlyExpensesCard title="Monthly Expenses" monthlyObj={monthlyExpenses}/>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

const MonthyBudgetCard = Card(({ monthlyBudget }) => (
  <p>Your Monthly Budget is: {monthlyBudget}</p>
));

const  MonthlyExpensesCard = Card(({ monthlyObj, handleAdd, handleEdit })=>{
  const printExenses = Object.keys(monthlyObj).map((key, i) => (
    <tr key={i} className="tr">
      <td className="td">{key}</td>
      <td className="td">{monthlyObj[key]}</td>
    </tr>
  ));
  return (
    <table className="table is-fullwidth">
      <tbody className="tbody">{printExenses}</tbody>
    </table>
  );
});

export default Budget;
