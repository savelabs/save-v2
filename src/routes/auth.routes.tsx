import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Overboarding } from '../pages/Overboarding';
import { Login } from '../pages/Login';

const { Navigator, Screen } = createStackNavigator();

interface AuthRoutesProps {
  isFirstTime: boolean;
}

export default function AuthRoutes({ isFirstTime }: AuthRoutesProps) {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        {isFirstTime && (
          <Screen name="FirstOver" component={Overboarding} />
        )}
        <Screen name="Login" component={Login} />
      </Navigator>
    </NavigationContainer>
  );
};

