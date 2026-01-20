import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('admin_token');

  // If no token exists, redirect to login page
  if (!token) {
    return <Navigate to="/admin/login" replace />;  // ← CHANGED
  }

  return children;
};

export default ProtectedRoute;