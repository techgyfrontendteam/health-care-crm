import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { Toaster } from 'sonner';
import { NotificationHandler } from './notifications/NotificationHandler';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NotificationHandler />
        <AppRoutes />
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </Provider> 
  );
}

export default App;
