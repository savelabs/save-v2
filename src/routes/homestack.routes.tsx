import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Documents } from '../pages/Documents';
import { Home } from '../pages/Home';
import { ProfileTickets } from '../pages/Profile/ProfileTickets';
import { CreateTickets } from '../pages/Profile/ProfileTickets/CreateTickets';

export type AppStackParams = {
  HomeStack: undefined;
  Documents: undefined;
  ProfileTickets: undefined;
  CreateTickets: undefined;
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
        <Screen name="ProfileTickets" component={ProfileTickets} />
        <Screen name="CreateTickets" component={CreateTickets} />
      </Group>
    </Navigator>
  );
}
