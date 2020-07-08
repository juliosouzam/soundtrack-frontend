import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import api from '../services/api';

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const signed = !!localStorage.getItem('@soundtrack/token');

  useEffect(() => {
    api.get('/status').catch(() => {
      localStorage.setItem('@soundtrack/token', '');
      return <Redirect to="/" />;
    });
  }, []);

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/home" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
