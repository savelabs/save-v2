import React, {
  useEffect,
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveApi, suapApi } from '../services/api';

type Student = {
  notification?: boolean;
  studentID: string;
  cpf: string;
  nomeUsual: string;
  completeName: string;
  birthDate: string;
  emailSuap: string;
  email: string;
  avatarSave: string;
  avatarSuap: string;
  avatarSaveURL: string;
  campus: string;
  situation: string;
  course: string;
  class: string;
  admin: boolean;
}

type AuthState = {
  student: Student;
  token: string;
}

type SignInType = {
  matricula: string;
  password: string;
}

type AuthContextData = {
  renew: () => Promise<void>;
  updateUser: (student: Student, token: string) => void;
  signOut: () => Promise<void>;
  setPeriodKey: (period: string) => Promise<void>;
  removeFirstTime: () => Promise<void>;
  isUserFirstTime: boolean;
  loading: boolean;
  data: AuthState;
  student: Student;
  signIn: ({ matricula, password }: SignInType) => Promise<void>;
  periodKey: string;
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

  const [isUserFirstTime, setIsUserFirstTime] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, student, period, storageFirstTime] = await AsyncStorage.multiGet([
        '@Save:token',
        '@Save:student',
        '@Save:period',
        '@Save:firsttime'
      ]);

      if (token[1] && student[1]) {
        setData({ token: token[1], student: JSON.parse(student[1]) });
      }

      if (period[1]) {
        setStatePeriodKey(JSON.parse(period[1]));
      }

      if (storageFirstTime[1] === 'false') {
        setIsUserFirstTime(false);
      }

      setLoading(false);
    }
    loadStorageData();
  }, []);

  async function removeFirstTime() {
    setIsUserFirstTime(false);
    await AsyncStorage.setItem('@Save:firsttime', 'false');
  }

  async function signIn({ matricula, password }: SignInType) {
    try {
      const response = await suapApi.post('/autenticacao/token/', {
        username: matricula,
        password,
      });

      const { token } = response.data;

      try {
        const getStudent = await saveApi.get('/students/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { student } = getStudent.data;

        await AsyncStorage.multiSet([
          ['@Save:token', token],
          ['@Save:password', password],
          ['@Save:student', JSON.stringify(student)],
        ]);

        setData({ student, token });
      } catch (error) {
        console.log('erro');
        console.log(error);
        // TRATATIVA DE ERRO SUAP ERROR
      }
    } catch (error) {
      console.log('erro');
      // TRATATIVA DE ERRO
    }
  }

  async function signOut() {
    await AsyncStorage.multiRemove([
      '@Save:token',
      '@Save:student',
      '@Save:password',
    ]);

    setData({} as AuthState);
  }

  async function updateUser(student: Student, token: string) {
    setData({
      student,
      token,
    });
  }

  async function renew() {
    const password = await AsyncStorage.getItem('@Save:password');
    const studentOld = await AsyncStorage.getItem('@Save:student');

    const studentNew = await JSON.parse(studentOld || '');

    if (!studentNew.matricula) {
      signOut();
    }

    const { matricula } = studentNew;

    try {
      const response = await suapApi.post('/autenticacao/token/', {
        username: matricula,
        password,
      });

      const { token } = response.data;

      const getStudent = await saveApi.get('/students/', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { student } = getStudent.data;

      await AsyncStorage.multiSet([
        ['@Save:token', token],
        ['@Save:password', password],
        ['@Save:student', JSON.stringify(student)],
      ]);

      setData({ student, token });
    } catch (err) {
      signOut();
      // ERRO N CONSEGUIU MANTER
    }
  }

  async function setPeriodKey(period: string) {
    await AsyncStorage.setItem('@Save:period', JSON.stringify(period));
  };

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
        periodKey
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
