import React, { useContext } from 'react';
import { Context } from '../app/MyProvider';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AddExpense from '../addExpense/AddExpense';
import History from '../history/History';
import Budget from '../budget/Budget';
import Auth from '../auth/Auth';
import Charts from '../charts/Charts';

function Routes() {
  const { user, isUserChecked } = useContext(Context);
  if (!isUserChecked) return <div />;
  return (
    <Switch>
      <Route exact path="/sign-up" component={Auth} />
      <Route exact path="/sign-in" component={Auth} />
      <ProtectedRoute valid={!!user} exact path="/charts" component={Charts} />
      <ProtectedRoute valid={!!user} exact path="/" component={AddExpense} />
      <ProtectedRoute
        valid={!!user}
        exact
        path="/history"
        component={History}
      />
      <ProtectedRoute valid={!!user} exact path="/budget" component={Budget} />
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
