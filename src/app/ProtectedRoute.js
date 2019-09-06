import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({
  valid,
  component: Component,
  render,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => {
        return valid ? <Component {...props} /> : <Redirect to="/sign-up" />;
      }}
    />
  );
}
