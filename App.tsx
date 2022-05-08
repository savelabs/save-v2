import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import AppLoading from 'expo-app-loading';
import FlashMessage from "react-native-flash-message";

import { useFonts, BalooChettan2_700Bold, BalooChettan2_500Medium } from '@expo-google-fonts/baloo-chettan-2';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';
import { Routes } from './src/routes/index.routes';
import { AppProvider } from './src/hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LogBox, StatusBar } from 'react-native';

import { ApolloProvider } from "@apollo/client";
import { clientGraphql } from './src/utils/api';

import * as Updates from "expo-updates";

export default function App() {
  const [fontsLoaded] = useFonts({
    BalooChettan2_700Bold,
    BalooChettan2_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_500Medium,
    Poppins_700Bold
  });

  useEffect(() => {
    async function updateApp() {
      const { isAvailable } = await Updates.checkForUpdateAsync();
      if (isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    }
    updateApp();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  LogBox.ignoreLogs(['Setting a timer']);
  const client = new QueryClient();

  return (
    <ApolloProvider client={clientGraphql}>
      <QueryClientProvider client={client}>
        <AppProvider>
          <StatusBar backgroundColor="#5F2F8E" />
          <Routes />
          <FlashMessage position="top" />
        </AppProvider>
      </QueryClientProvider>
    </ApolloProvider >
  );
}
