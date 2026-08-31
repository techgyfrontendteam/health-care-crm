import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

export const AuthLayout = () => {
  const { isAuthenticated, isFirstLogin } = useAuth();
  const currentRole = useSelector((state: RootState) => state.auth.currentRole);

  if (isAuthenticated && isFirstLogin) {
    return <Navigate to="/set-password" replace />;
  }

  if (isAuthenticated && !isFirstLogin) {
    const roleCode = currentRole?.code ?? '';
    if (roleCode === 'RELMNG') return <Navigate to="/relationship-managers/dashboard" replace />;
    if (roleCode === 'EXPMNG') return <Navigate to="/agents/dashboard" replace />;
    return <Navigate to="/leads" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 px-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};
