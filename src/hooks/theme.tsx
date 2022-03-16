import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
type ThemeContextData = {
  theme: string;
  setTheme: (theme: ThemeProps) => Promise<void>;
}

type ThemeProvider = {
  children: ReactNode;
}

type ThemeProps = 'auto' | 'light' | 'dark'

export const ThemeContext = createContext<ThemeContextData>(
  {} as ThemeContextData,
);

export function ThemeProvider({ children }: ThemeProvider) {
  const [theme, setThemeState] = useState<ThemeProps>('auto');

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const theme = await AsyncStorage.getItem('@Save:theme');

      if (theme) {
        setThemeState(theme as ThemeProps);
      }
    }
    loadStorageData();
  }, []);

  async function setTheme(theme: ThemeProps) {
    await AsyncStorage.setItem('@Save:theme', theme);
    setThemeState(theme)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeMode(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
