import React from 'react';
import AppLoading from 'expo-app-loading';

import { ThemeProvider } from 'styled-components';
import { light, dark } from '../global/styles/themes';

import AppStackRoutes from './appstack.routes';
import AuthRoutes from './auth.routes';

import { useAuth } from '../hooks/auth';

export function Routes() {
  const { student, loading, isUserFirstTime } = useAuth();

  if (loading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={light}>
      {student ? <AppStackRoutes /> : <AuthRoutes isFirstTime={isUserFirstTime} />}
    </ThemeProvider>
  );
};

