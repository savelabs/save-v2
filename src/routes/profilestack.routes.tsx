import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileData } from '../pages/Profile/ProfileData';
import { Profile } from '../pages/Profile/ProfileHome';
import { ProfileSettings } from '../pages/Profile/ProfileSettings';
import { ProfileEdit } from '../pages/Profile/ProfileEdit';

export type AppStackParams = {
  ProfileHome: undefined;
  ProfileData: undefined;
  ProfileSettings: undefined;
  ProfileEdit: undefined;
};

const { Navigator, Screen, Group } = createStackNavigator<AppStackParams>();

export default function ProfileStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Group>
        <Screen name="ProfileHome" component={Profile} />
        <Screen name="ProfileData" component={ProfileData} />
        <Screen name="ProfileSettings" component={ProfileSettings} />
        <Screen name="ProfileEdit" component={ProfileEdit} />
      </Group>
    </Navigator>
  );
}
