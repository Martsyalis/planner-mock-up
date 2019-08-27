import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Main from '../main/Main';

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Main} />
      <Redirect to="/" />
    </Switch>
  );
}

export default withRouter(Routes);
