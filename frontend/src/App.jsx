import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Login from './components/Login';
import Home from './components/Home';
import Registion from './components/Registion';
import ProtectedRoute from './auth/Protect';
import NotFound from './components/NotFound';
import ProtectedLoginRoute from './auth/ProtectedLoginRoute';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <ProtectedLoginRoute>
        <Login />
      </ProtectedLoginRoute>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedLoginRoute>
        <Registion />
      </ProtectedLoginRoute>
    ),
  },
  {
    path: '/forget-password',
    element: (
      <ProtectedLoginRoute>
        <ForgetPassword />
      </ProtectedLoginRoute>
    ),
  },
  {
    path: '/reset-password/:token',
    element: (
      <ProtectedLoginRoute>
        <ResetPassword />
      </ProtectedLoginRoute>
    ),
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
