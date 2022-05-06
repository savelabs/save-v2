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
import { gql } from '@apollo/client';
import { print } from 'graphql';

import axios from 'axios';

export type SignInCredentials = {
  token: string;
  refreshToken: string;
  apiToken: string;
  cookies: string;
}

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
  signIn: ({ matricula, password }: SignInType, signInCredentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  renew: () => Promise<void>;
  renewSaveCredentials: () => Promise<void>;
  updateUser: (data: AuthState) => void;
  setClassKey: (classProps: SelectedClassProps) => void;
  setPeriodKey: (period: string) => Promise<void>;
  removeFirstTime: () => Promise<void>;
  setUserEnrolled: (userEnrolled: boolean) => Promise<void>;
  isUserFirstTime: boolean;
  loading: boolean;
  data: AuthState;
  student: InformaçõesPessoais;
  periodKey: string;
  classKey: SelectedClassProps;
  isUserEnrolled: boolean;
  saveCredentials: SignInCredentials | null;
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
  const [isUserEnrolled, setStateIsUserEnrolled] = useState(false);
  const [saveCredentials, setSaveCredentials] = useState<SignInCredentials | null>(null);

  const [isUserFirstTime, setIsUserFirstTime] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [
        storageFirstTime,
        studentSuapCredentials,
        student,
        period,
        saveCredentialsStoraged
      ] = await AsyncStorage.multiGet([
        '@Save:firstTime',
        '@Save:studentSuapCredentials',
        '@Save:student',
        '@Save:period',
        '@Save:saveCredentialsStoraged'
      ]);

      if (storageFirstTime[1] === 'false') {
        setIsUserFirstTime(false);
      }

      if (studentSuapCredentials[1] && student[1]) {
        setData({
          credentials: JSON.parse(studentSuapCredentials[1]),
          student: JSON.parse(student[1])
        });
      }

      if (period[1]) {
        setStatePeriodKey(JSON.parse(period[1]));
      }

      if (saveCredentialsStoraged[1]) {
        setSaveCredentials(JSON.parse(saveCredentialsStoraged[1]))
      }

      setLoading(false);
    }
    loadStorageData();
  }, []);

  async function signIn(
    { matricula, password }: SignInType,
    signInCredentials: SignInCredentials
  ) {
    const client = new ClienteSuap({ usarApenasApi: true });
    try {
      // DADOS DO USUÁRIO
      await client.login(matricula, password);
      const studentSuapInfo = await client.obterInformaçõesPessoais();
      const studentSuapCredentials = await client.obterCredenciais();

      if (!signInCredentials) {
        return errorAlert('Erro interno no servidor', 'Algum erro ocorreu em nosso servidor.')
      }

      await setItemAsync('studentCredentials', JSON.stringify({ matricula, password }));

      // SALVANDO STUDENT E CREDENCIAIS DA SDK
      await AsyncStorage.multiSet([
        ['@Save:studentSuapCredentials', JSON.stringify(studentSuapCredentials)],
        ['@Save:student', JSON.stringify(studentSuapInfo)],
      ]);

      setStateIsUserEnrolled(true);

      setData({
        student: studentSuapInfo,
        credentials: studentSuapCredentials
      });

      setSaveCredentials(signInCredentials)

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
      // OBTENDO CREDENCIAIS DO ARMAZENAMENTO SEGURO
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

      // ATUALIZANDO STORAGE
      await AsyncStorage.multiSet([
        ['@Save:studentSuapCredentials', JSON.stringify(updatedCredentials)],
        ['@Save:student', JSON.stringify(student)],
      ]);

      setData({
        student,
        credentials: updatedCredentials,
      });

      setSaveCredentials(saveCredentials)
    } catch (err) {
      await signOut()
      return errorAlert('Sua sessão expirou', 'Tente realizar o login novamente.')
    }
  }

  async function renewSaveCredentials() {
    try {
      const credentials = await getItemAsync('studentCredentials')
      if (!credentials) {
        await signOut()
        return errorAlert('Login inválido ou expirado', 'Tente realizar o login novamente.')
      }
      const parseCredentials: SignInType = JSON.parse(credentials);

      const LOGIN = gql`
        mutation Login($matriculation: String!, $password: String!) {
          login(data: {
            matriculation: $matriculation
            password: $password
          }) {
            user {
              id,
            },
            token,
            refreshToken,
            apiToken,
            cookies
          }
        }
      `
      const response = await axios.post('https://save.oulu.ifrn.edu.br/graphql', {
        query: print(LOGIN),
        variables: {
          matriculation: parseCredentials.matricula,
          password: parseCredentials.password
        },
      })

      setSaveCredentials(response.data.data.login);
      AsyncStorage.setItem('@Save:saveCredentialsStoraged', JSON.stringify(response.data.data.login))
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

  async function setUserEnrolled(userEnrolled: boolean) {
    setStateIsUserEnrolled(userEnrolled);
  };

  async function removeFirstTime() {
    setIsUserFirstTime(false);
    await AsyncStorage.setItem('@Save:firstTime', 'false');
  }

  return (
    <AuthContext.Provider
      value={{
        setUserEnrolled,
        isUserEnrolled,
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
        renewSaveCredentials,
        saveCredentials,
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
