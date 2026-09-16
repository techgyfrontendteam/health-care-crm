import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/app/store';
import { AuthProvider } from '@/app/providers/AuthProvider';

/**
 * Application-wide providers belong here so the root component remains a
 * composition boundary rather than accumulating infrastructure concerns.
 */
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
