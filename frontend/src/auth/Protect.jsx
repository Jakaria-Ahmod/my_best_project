import React from 'react';
import { Navigate, useLocation } from 'react-router';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken'); // check login
  const location = useLocation();

  if (!token) {
    // logged out → redirect to login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // logged in → allow access
  return children;
};

export default ProtectedRoute;
