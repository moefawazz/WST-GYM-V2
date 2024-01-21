// components/EmailProtectedRoute.js
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

const AllowedEmail = 'hamoudirachido@gmail.com';

const EmailProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    // Redirect to the login page if not authenticated
    return <Navigate to='/' />;
  }

  if (user.email !== AllowedEmail) {
    // Redirect to unauthorized page if the email is not allowed
    return <Navigate to='/unauthorized' />;
  }

  // Render the email protected route if authenticated and email is allowed
  return <Routes>{children}</Routes>;
};

export default EmailProtectedRoute;
