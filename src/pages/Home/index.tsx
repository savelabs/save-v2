import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { RFValue } from "react-native-responsive-fontsize";

import { useAuth } from '../../hooks/auth';
import { saveApi } from '../../services/api';

import {
  StudentName,
  HeaderContainer,
  Hello,
  NavContainer,
  UserImage
} from './styles';

export function Home() {
  const { data, updateUser, renew, signOut, student } = useAuth();
  const [loading, setLoading] = useState(false);

  const avatarSuap = `https://suap.ifrn.edu.br${student.avatarSuap}`;

  useEffect(() => {
    async function updateUserData() {
      setLoading(true)
      try {
        const getStudent = await saveApi.get('/students/', {
          headers: { Authorization: `Bearer ${data.token}` },
        });

        const { student } = getStudent.data;

        updateUser(student, data.token);
        setLoading(false);
      } catch {
        await renew();
        setLoading(false);
      }
    }
    updateUserData()
  }, []);

  return (
    <HeaderContainer>
      <Hello>
        Olá,
        {" \n"}
        <StudentName>
          {student.nomeUsual}
        </StudentName>
      </Hello>
      <NavContainer>
        <Feather name="bell" size={RFValue(24)} />
        <UserImage source={{ uri: student.avatarSave ? student.avatarSaveURL : avatarSuap }} />
      </NavContainer>
    </HeaderContainer>
  )
}
