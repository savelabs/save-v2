import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Documents } from '../pages/Documents';
import { Home } from '../pages/Home';

export type AppStackParams = {
  HomeStack: undefined;
  Documents: undefined;
  DocumentView: {
    documentURL: string;
    cookies: string;
  }
};

const { Navigator, Screen, Group } = createStackNavigator<AppStackParams>();

export default function HomeStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Group>
        <Screen name="HomeStack" component={Home} />
        <Screen name="Documents" component={Documents} />
      </Group>
    </Navigator>
  );
}
