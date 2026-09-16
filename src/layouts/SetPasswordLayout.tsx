import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';

export const SetPasswordLayout = () => {
  const { isAuthenticated, isFirstLogin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isFirstLogin) {
    return <Navigate to="/leads" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
