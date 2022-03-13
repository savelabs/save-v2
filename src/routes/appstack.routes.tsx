import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackRouter } from '@react-navigation/native';

import AppRoutes from './app.routes';
import { Materials } from '../pages/Study/Materials';
import { Classes } from '../pages/Study/SchoolClasses';
import { Infos } from '../pages/Study/Infos';
import { Grades } from '../pages/Study/Grades';

export type AppStackParams = {
  AppRoutes: undefined;
  Materials: undefined;
  Classes: undefined;
  Infos: undefined;
  Grades: undefined;
};

const { Navigator, Screen, Group } = createStackNavigator<AppStackParams>();

export default function AppStackRoutes() {

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Group screenOptions={{ animationEnabled: false }}>
        <Screen name="Grades" component={Grades} />
        <Screen name="Materials" component={Materials} />
        <Screen name="Classes" component={Classes} />
        <Screen name="Infos" component={Infos} />
      </Group>
    </Navigator>
  );
}
