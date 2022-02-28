import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AppRoutes from './app.routes';

export type AppStackParams = {
  AppRoutes: undefined;
};

const { Navigator, Screen } = createStackNavigator<AppStackParams>();

export default function AppStackRoutes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="AppRoutes" component={AppRoutes} />
      </Navigator>
    </NavigationContainer >
  );
}
