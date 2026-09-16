import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
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
    <div className="clinical-grid relative min-h-screen flex items-center justify-center bg-white px-4 pb-16">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
      <footer className="absolute inset-x-0 bottom-0 border-t border-[#e2e8f0] bg-white/90 px-4 py-4 text-center text-xs text-slate-500 backdrop-blur-sm">
        © {new Date().getFullYear()} TechGy Link. All rights reserved.
      </footer>
    </div>
  );
};
