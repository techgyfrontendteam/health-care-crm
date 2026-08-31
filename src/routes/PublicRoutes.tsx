import React from 'react';
import { Route } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';

const LoginPage = React.lazy(() => import('../features/auth/pages/LoginPage').then(m => ({ default: m.LoginPage })));
const ForgotPasswordPage = React.lazy(() => import('../features/auth/pages/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));

export const PublicRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/auth/forgotPassword" element={<ForgotPasswordPage />} />
  </Route>
);
