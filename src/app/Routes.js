import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Main from '../main/Main';
import History from '../history/History';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/history" component={History} />

      <Redirect to="/" />
    </Switch>
  );
}

export default withRouter(Routes);
