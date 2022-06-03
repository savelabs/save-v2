import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { DetailGrades } from '../pages/Study/components/DetailGrades';
import { StudyPage } from '../pages/Study/components/StudyPage';

export type AppStackParams = {
  AppRoutes: undefined;
  Materials: undefined;
  Classes: undefined;
  Infos: undefined;
  Grades: undefined;
  ProfileData: undefined;
  DetailGrades: {
    classID: string;
  }
};

const { Navigator, Screen, Group } = createStackNavigator<AppStackParams>();

export default function StudyStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Group screenOptions={{ animationEnabled: false }}>
        <Screen name="Grades" component={StudyPage} />
        <Screen name="DetailGrades" component={DetailGrades} />
      </Group>
    </Navigator>
  );
}
