import React, {
  useEffect,
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { ClienteSuap, Credenciais, InformaçõesPessoais } from 'suap-sdk-javascript';
import { setItemAsync, getItemAsync } from 'expo-secure-store';
import { errorAlert } from '../utils/alert';

type AuthState = {
  student: InformaçõesPessoais;
  credentials: Credenciais;
}

type SignInType = {
  matricula: string;
  password: string;
}

type SelectedClassProps = {
  id?: number,
  description?: string
}

type AuthContextData = {
  signIn: ({ matricula, password }: SignInType) => Promise<void>;
  signOut: () => Promise<void>;
  renew: () => Promise<void>;
  updateUser: (data: AuthState) => void;
  setClassKey: (classProps: SelectedClassProps) => void;
  setPeriodKey: (period: string) => Promise<void>;
  removeFirstTime: () => Promise<void>;
  isUserFirstTime: boolean;
  loading: boolean;
  data: AuthState;
  student: InformaçõesPessoais;
  periodKey: string;
  classKey: SelectedClassProps;
}

type AuthProvider = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export function AuthProvider({ children }: AuthProvider) {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [periodKey, setStatePeriodKey] = useState('');
  const [classKey, setStateClassKey] = useState<SelectedClassProps>({});

  const [isUserFirstTime, setIsUserFirstTime] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [storageFirstTime, studentSuapCredentials, student, period,] = await AsyncStorage.multiGet([
        '@Save:firstTime',
        '@Save:studentSuapCredentials',
        '@Save:student',
        '@Save:period',
      ]);

      if (storageFirstTime[1] === 'false') {
        setIsUserFirstTime(false);
      }

      if (studentSuapCredentials[1] && student[1]) {
        setData({ credentials: JSON.parse(studentSuapCredentials[1]), student: JSON.parse(student[1]) });
      }

      if (period[1]) {
        setStatePeriodKey(JSON.parse(period[1]));
      }

      setLoading(false);
    }
    loadStorageData();
  }, []);

  async function signIn({ matricula, password }: SignInType) {
    const client = new ClienteSuap({ usarApenasApi: true });

    try {
      await client.login(matricula, password);

      const studentSuapInfo = await client.obterInformaçõesPessoais();
      const studentSuapCredentials = await client.obterCredenciais();

      await setItemAsync('studentCredentials', JSON.stringify({ matricula, password }));

      await AsyncStorage.multiSet([
        ['@Save:studentSuapCredentials', JSON.stringify(studentSuapCredentials)],
        ['@Save:student', JSON.stringify(studentSuapInfo)],
      ]);

      return setData({ student: studentSuapInfo, credentials: studentSuapCredentials });
    } catch (err: any) {
      if (err.response.status === 401) {
        return errorAlert(err.response.data.detail, 'Certifique de que as informações estão corretas.')
      }
      if (err.response.status === 503) {
        return errorAlert('SUAP em manutenção', 'O SUAP encontra-se em manutenção, por favor volte mais tarde.')
      }
      return errorAlert(err.response.data.detail, 'Um erro inesperado ocorreu, para mais informações: contato.appsave@gmail.com.')
    }
  }

  async function renew() {
    try {
      const credentials = await getItemAsync('studentCredentials')
      if (!credentials) {
        await signOut()
        return errorAlert('Login inválido ou expirado', 'Tente realizar o login novamente.')
      }

      const client = new ClienteSuap({ usarApenasApi: true })
      const parseCredentials: SignInType = JSON.parse(credentials);
      await client.login(parseCredentials.matricula, parseCredentials.password);
      const student = await client.obterInformaçõesPessoais();

      const updatedCredentials = await client.obterCredenciais();

      await AsyncStorage.setItem('@Save:studentSuapCredentials', JSON.stringify(updatedCredentials))
      return setData({ student, credentials: updatedCredentials });
    } catch (err) {
      await signOut()
      return errorAlert('Sua sessão expirou', 'Tente realizar o login novamente.')
    }

  }

  async function signOut() {
    await AsyncStorage.multiRemove([
      '@Save:student',
      '@Save:studentSuapCredentials',
    ]);

    setData({} as AuthState);
  }

  async function updateUser({ student, credentials }: AuthState) {
    setData({
      student, credentials
    });
  }

  async function setPeriodKey(period: string) {
    setStatePeriodKey(period);
    AsyncStorage.setItem('@Save:period', JSON.stringify(period));
  };

  async function setClassKey(classProps: SelectedClassProps) {
    setStateClassKey(classProps);
  };

  async function removeFirstTime() {
    setIsUserFirstTime(false);
    await AsyncStorage.setItem('@Save:firstTime', 'false');
  }

  return (
    <AuthContext.Provider
      value={{
        removeFirstTime,
        isUserFirstTime,
        renew,
        updateUser,
        signOut,
        setPeriodKey,
        signIn,
        loading,
        data,
        student: data.student,
        periodKey,
        setClassKey,
        classKey
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
