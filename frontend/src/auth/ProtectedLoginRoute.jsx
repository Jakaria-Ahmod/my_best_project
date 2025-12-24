import React from 'react';
import { Navigate } from 'react-router';

const ProtectedLoginRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken'); // check login
  if (token) {
    // already logged in → redirect to home
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default ProtectedLoginRoute;
