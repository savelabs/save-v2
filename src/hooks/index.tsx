import React, { ReactNode } from 'react';

import { AuthProvider } from './auth';

type AppProvider = {
  children: ReactNode
}

export function AppProvider({ children }: AppProvider) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

