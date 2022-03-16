import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { ThemeContext } from 'styled-components/native';
import { useAuth } from '../../../hooks/auth';
import { ProfileHeader } from '../components/ProfileHeader';

import {
  Container,
  HeaderContainer,
  NavButton,
  ShapeIcon,
  NavTextContainer,
  NavTitle,
  NavDescription,

  ReturnContainer,
  ReturnText
} from './styles';

export function ProfileData() {
  const { student } = useAuth();
  const birthDate = student.data_nascimento.split('-')

  const { goBack } = useNavigation();
  const { colors } = useContext(ThemeContext);

  return (
    <Container>
      <ReturnContainer onPress={() => goBack()}>
        <Feather name="chevron-left" size={RFValue(24)} color={colors.primary_dark} />
        <ReturnText>Perfil</ReturnText>
      </ReturnContainer>

      <HeaderContainer>
        <ProfileHeader />
      </HeaderContainer>

      <NavButton>
        <ShapeIcon>
          <Feather name="bookmark" size={RFValue(24)} color={colors.primary_dark} />
        </ShapeIcon>
        <NavTextContainer>
          <NavDescription>
            <NavTitle>Matrícula{'\n'}</NavTitle>
            {student.matricula}
          </NavDescription>
        </NavTextContainer>
      </NavButton>

      <NavButton>
        <ShapeIcon>
          <Feather name="mail" size={RFValue(24)} color={colors.primary_dark} />
        </ShapeIcon>
        <NavTextContainer>
          <NavDescription>
            <NavTitle>Email acadêmico{'\n'}</NavTitle>
            {student.email}
          </NavDescription>
        </NavTextContainer>
      </NavButton>

      <NavButton>
        <ShapeIcon>
          <Feather name="mail" size={RFValue(24)} color={colors.primary_dark} />
        </ShapeIcon>
        <NavTextContainer>
          <NavDescription>
            <NavTitle>Email escolar{'\n'}</NavTitle>
            EM BREVE
          </NavDescription>
        </NavTextContainer>
      </NavButton>

      <NavButton>
        <ShapeIcon>
          <Feather name="key" size={RFValue(24)} color={colors.primary_dark} />
        </ShapeIcon>
        <NavTextContainer>
          <NavDescription>
            <NavTitle>CPF{'\n'}</NavTitle>
            {student.cpf}
          </NavDescription>
        </NavTextContainer>
      </NavButton>

      <NavButton>
        <ShapeIcon>
          <Feather name="gift" size={RFValue(24)} color={colors.primary_dark} />
        </ShapeIcon>
        <NavTextContainer>
          <NavDescription>
            <NavTitle>Data de Nascimento{'\n'}</NavTitle>
            {`${birthDate[2]}/${birthDate[1]}/${birthDate[0]}`}
          </NavDescription>
        </NavTextContainer>
      </NavButton>
    </Container>
  )
}
