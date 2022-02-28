import { Feather } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { RFValue } from "react-native-responsive-fontsize";
import { ThemeContext } from 'styled-components/native';
import { ClienteSuap } from 'suap-sdk-javascript';

import { useAuth } from '../../hooks/auth';

import {
  StudentName,
  HeaderContainer,
  Hello,
  NavContainer,
  UserImage,
  Container,
} from './styles';

export function Home() {
  const { data, updateUser, renew, student } = useAuth();
  const [loading, setLoading] = useState(false);
  const { colors } = useContext(ThemeContext);

  const avatarSuap = `https://suap.ifrn.edu.br${student.url_foto_150x200}`;

  useEffect(() => {
    async function updateUserData() {
      setLoading(true)
      try {
        const clientStudent = new ClienteSuap({ credenciais: data.credentials, usarApenasApi: true });

        const student = await clientStudent.obterInformaçõesPessoais();
        const updatedCredentials = await clientStudent.obterCredenciais();

        const newData = { student, credentials: updatedCredentials };

        updateUser(newData);
        setLoading(false);
      } catch {
        await renew();
        setLoading(false);
      }
    }
    updateUserData()
  }, []);

  return (
    <>
      <HeaderContainer>
        <Hello>
          Olá,
          {" \n"}
          <StudentName>
            {student.nome_usual}
          </StudentName>
        </Hello>
        <NavContainer>
          <Feather name="bell" size={RFValue(24)} color={colors.text_white} />
          <UserImage source={{ uri: avatarSuap }} />
        </NavContainer>
      </HeaderContainer>
      <Container>
      </Container>
    </>
  )
}
