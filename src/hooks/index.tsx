import React, { ReactNode } from 'react';

import { AuthProvider } from './auth';
import { ThemeProvider } from './theme';

type AppProvider = {
  children: ReactNode
}

export function AppProvider({ children }: AppProvider) {
  return (
    <AuthProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AuthProvider>
  )
}

