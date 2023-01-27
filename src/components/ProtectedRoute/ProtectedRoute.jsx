import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute(props) {
  return <Route>{() => (props.isLogged ? props.children : <Redirect to='./sign-in' />)}</Route>;
}
