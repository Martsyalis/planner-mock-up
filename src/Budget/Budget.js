import React, { useState, useEffect } from 'react';
import { getBudgetById, setBudgetById } from '../services/Firestore';
import { Hero, NumberInput, Card } from '../commonComponents/commonComponents';

function Budget() {
  const [monthlyBudget, setBudget] = useState(0);
  const [input, setInput] = useState('');
  useEffect(() => {
    getBudgetById().then(result => {
      setBudget(result.monthlyBudget);
    });
  }, [monthlyBudget]);

  //TODO: add spinner
  const functionObj = {
    editMonthlyBudget(budget) {
      setBudgetById(budget).then(() => {
        getBudgetById().then(result => {
          setBudget(result.monthlyBudget);
          setInput('');
        });
      });
    }
  };
  return (
    <React.Fragment>
      {input ? (
        <NumberInput handleSubmit={functionObj[input]} />
      ) : (
        <div>
          <Hero title="Budget" />
          <Card
            number={monthlyBudget}
            handleEdit={() => setInput('editMonthlyBudget')}
          />
        </div>
      )}
    </React.Fragment>
  );
}



// function MonthlyExpenses({monthy})

export default Budget;
