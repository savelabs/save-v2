import React, { useContext } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components';

import { Home } from '../pages/Home';

import { RFValue } from 'react-native-responsive-fontsize';
import { useColorScheme, View } from 'react-native';

import ProfileStackRoutes from './profilestack.routes';
import StudyStackRoutes from './studystack.routes';
import { useThemeMode } from '../hooks/theme';
import HomeStackRoutes from './homestack.routes';


export type AppBottomTabsParams = {
  Home: undefined;
  Study: undefined;
  Profile: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<AppBottomTabsParams>();

export default function AppRoutes() {
  const { colors } = useContext(ThemeContext);
  const autoTheme = useColorScheme()
  const { theme } = useThemeMode()

  return (
    <NavigationContainer theme={theme === 'auto'
      ? autoTheme === 'light'
        ? undefined
        : DarkTheme
      : theme === 'light'
        ? undefined
        : DarkTheme
    }>
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
          tabBarHideOnKeyboard: true
        })}
      >
        <Screen
          name="Study"
          component={StudyStackRoutes}
        />
        <Screen
          name="Home"
          component={HomeStackRoutes}
        />
        <Screen
          name="Profile"
          component={ProfileStackRoutes}
        />
      </Navigator>
    </NavigationContainer>
  );
}
