/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {
  const isAuthenticated = useSelector(
    state => state.User.isAuthenticated,
  );

  return isAuthenticated ? (
    <Route
      {...rest}
      render={props => <RouteComponent {...props} />}
    />
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
