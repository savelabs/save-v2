import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Overboarding } from '../pages/Overboarding';
import { Login } from '../pages/Login';

export type AuthStackParams = {
  FirstOver: undefined;
  Login: undefined;
};

interface AuthRoutesProps {
  isFirstTime: boolean;
}

const { Navigator, Screen } = createStackNavigator<AuthStackParams>();

export default function AuthRoutes({ isFirstTime }: AuthRoutesProps) {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        {isFirstTime ? (
          <Screen name="FirstOver" component={Overboarding} />
        ) : (
          <Screen name="Login" component={Login} />
        )}
      </Navigator>
    </NavigationContainer>
  );
};

