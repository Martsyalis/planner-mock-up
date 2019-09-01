import React, { useState, useEffect } from 'react';
import { getBudgetById, setBudgetById } from '../services/Firestore';
import { Hero, NumberInput } from '../commonComponents/commonComponents';
import editIcon from '../assets/edit-icon.svg';

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

function Card({ number, handleEdit }) {
  return (
    <React.Fragment>
      <article className="message is-info">
        <div className="message-header">
          <p>Budget</p>
          <span className="icon" onClick={handleEdit}>
            <img src={editIcon} />
          </span>
        </div>
        <div className="message-body">
          Your monthly budget is: {number}
        </div>
      </article>
    </React.Fragment>
  );
}

// function MonthlyExpenses({monthy})

export default Budget;
