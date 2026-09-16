import React from 'react';
import { Toaster } from 'sonner';

import { AppProviders } from '@/app/providers/AppProviders';
import { NotificationHandler } from '@/notifications/NotificationHandler';
import { AppRoutes } from '@/routes/AppRoutes';

function App() {
  return (
    <AppProviders>
      <NotificationHandler />
      <AppRoutes />
      <Toaster position="top-right" richColors />
    </AppProviders>
  );
}

export default App;
