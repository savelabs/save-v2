import React from 'react';
import AppLoading from 'expo-app-loading';

import { ThemeProvider } from 'styled-components';
import { light, dark } from '../global/styles/themes';

import AuthRoutes from './auth.routes';

import { useAuth } from '../hooks/auth';
import AppRoutes from './app.routes';
import { useColorScheme, View, TouchableOpacity, Text } from 'react-native';
import { useThemeMode } from '../hooks/theme';

import * as LocalAuthentication from 'expo-local-authentication';
import { Button } from '../components/Forms/Button';

export function Routes() {
  const { student, loading, isUserFirstTime, isUserEnrolled, setUserEnrolled } = useAuth();
  const autoTheme = useColorScheme()
  const { theme } = useThemeMode()

  if (loading) {
    return <AppLoading autoHideSplash={false} />;
  }


  if (student && !isUserEnrolled) {
    function getAuthentication() {
      LocalAuthentication.authenticateAsync({
        promptMessage: 'Save',
      }).then((res) => {
        if (res.success) {
          setUserEnrolled(true)
        }
      })
    }

    getAuthentication()
    return (
      <View style={{
        flex: 1,
        padding: 28,
        backgroundColor: light.colors.primary,
        justifyContent: 'space-between',
      }} >
        <View />
        <TouchableOpacity
          onPress={getAuthentication}
          style={{
            width: '100%',
            height: 58,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 16,
            backgroundColor: light.colors.background
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Poppins_600SemiBold',
              color: light.colors.primary
            }}>
            Usar senha do celular
          </Text>
        </TouchableOpacity>
      </View >
    );
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

