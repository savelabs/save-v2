import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AppRoutes from './app.routes';
import { Login } from '../pages/Login';

const { Navigator, Screen } = createStackNavigator();

export default function AppStackRoutes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="AppRoutes" component={AppRoutes} />
        <Screen name="Test" component={Login} />
      </Navigator>
    </NavigationContainer >
  );
}
