import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const LoginGuard = ({ children, isAdminRoutes }) => {
  const location = useLocation();
  const protectedRoute = location.pathname.replace(/^\//, '');

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (!userInfo || !userInfo.token) {
    return <Navigate to={`/login?redirect=${protectedRoute}`} />;
  }

  if (isAdminRoutes && !userInfo.isAdmin) {
    return <Navigate to="/" />;
  }

  const decodedToken = jwtDecode(userInfo.token);

  if (decodedToken.exp < Date.now() / 1000) {
    localStorage.removeItem('userInfo');

    return <Navigate to={`/login?redirect=${protectedRoute}`} />;
  }

  return children;
};

LoginGuard.defaultProps = {
  isAdminRoutes: false,
};

LoginGuard.propTypes = {
  children: PropTypes.node.isRequired,
  isAdminRoutes: PropTypes.bool,
};

export default LoginGuard;
