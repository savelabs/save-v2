import React from 'react';
import AppLoading from 'expo-app-loading';

import { ThemeProvider } from 'styled-components';
import { light, dark } from '../global/styles/themes';

import AuthRoutes from './auth.routes';

import { useAuth } from '../hooks/auth';
import AppRoutes from './app.routes';
import { useColorScheme } from 'react-native';
import { useThemeMode } from '../hooks/theme';

export function Routes() {
  const { student, loading, isUserFirstTime } = useAuth();
  const autoTheme = useColorScheme()
  const { theme } = useThemeMode()

  if (loading) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider
      theme={
        theme === 'auto'
          ? autoTheme === 'light'
            ? light
            : dark
          : theme === 'light'
            ? light
            : dark}
    >
      {student ? <AppRoutes /> : <AuthRoutes isFirstTime={isUserFirstTime} />}
    </ThemeProvider>
  );
};

