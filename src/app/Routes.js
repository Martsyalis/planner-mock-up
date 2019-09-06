import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from '../main/Main';
import History from '../history/History';
import Budget from '../budget/Budget';
import Auth from '../auth/Auth';

function Routes() {
  return (
    <Switch>
      <Route exact path="/sign-up" component={Auth} />
      <Route exact path="/sign-in" component={Auth} />
      <Route exact path="/" component={Main} />
      <Route exact path="/history" component={History} />
      <Route exact path="/budget" component={Budget} />
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
