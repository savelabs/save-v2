import React, { useContext } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Feather } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components';

import { Home } from '../pages/Home';
import { Study } from '../pages/Study';
import { Profile } from '../pages/Profile';

import { RFValue } from 'react-native-responsive-fontsize';
import { View } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

export default function AppRoutes() {
  const { colors } = useContext(ThemeContext);

  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <>
              <Feather name={route.name === "Home" ? "home" : route.name === "Study" ? "book-open" : "user"} size={size} color={color} />
              {
                focused ?
                  <View style={{ backgroundColor: colors.alert, height: 8, width: 8, borderRadius: 4, marginTop: 4 }} />
                  :
                  <View style={{ marginTop: 4, height: 8, width: 8 }} />
              }
            </>
          );
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          elevation: 0,
          backgroundColor: colors.shape,
          height: RFValue(80),
        },
        tabBarActiveTintColor: colors.primary_dark,
        tabBarInactiveTintColor: colors.primary_dark,
      })}
    >
      <Screen
        name="Study"
        component={Study}
      />
      <Screen
        name="Home"
        component={Home}
      />
      <Screen
        name="Profile"
        component={Profile}
      />
    </Navigator>
  );
}
