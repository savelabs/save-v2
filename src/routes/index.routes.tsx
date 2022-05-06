import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';

import { ThemeProvider } from 'styled-components';
import { light, dark } from '../global/styles/themes';

import AuthRoutes from './auth.routes';

import { useAuth } from '../hooks/auth';
import AppRoutes from './app.routes';
import { useColorScheme, View } from 'react-native';
import { useThemeMode } from '../hooks/theme';

import * as LocalAuthentication from 'expo-local-authentication';

export function Routes() {
  const { student, loading, isUserFirstTime, isUserEnrolled, setUserEnrolled } = useAuth();
  const autoTheme = useColorScheme()
  const { theme } = useThemeMode()

  if (loading) {
    return <AppLoading autoHideSplash={false} />;
  }


  if (student && !isUserEnrolled) {
    LocalAuthentication.authenticateAsync().then((res) => {
      if (res.success) {
        setUserEnrolled(true)
      }
    })
    return <View style={{ flex: 1, backgroundColor: light.colors.primary }} />;
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

