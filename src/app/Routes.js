import React, { useContext } from 'react';
import { Context } from '../app/MyProvider';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Main from '../main/Main';
import History from '../history/History';
import Budget from '../budget/Budget';
import Auth from '../auth/Auth';

function Routes() {
  const { user, isUserChecked } = useContext(Context);
  if(!isUserChecked) return <div/>;
  return (
    <Switch>
      <Route exact path="/sign-up" component={Auth} />
      <Route exact path="/sign-in" component={Auth} />
      <ProtectedRoute valid={!!user} exact path="/" component={Main} />
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
