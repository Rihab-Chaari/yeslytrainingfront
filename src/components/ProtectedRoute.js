// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const role = localStorage.getItem('role'); // Adjust this according to where you're storing the role

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" />; // Redirect to login or another page if the user doesn't have the required role
  }

  return <Outlet />;
};

export default ProtectedRoute;
