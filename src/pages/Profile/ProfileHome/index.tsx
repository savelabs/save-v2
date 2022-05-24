import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { ThemeContext } from 'styled-components/native';
import { ProfileHeader } from '../components/ProfileHeader';

import {
  Container,
  HeaderContainer,
  NavButton,
  ShapeIcon,
  NavTextContainer,
  NavTitle,
  NavDescription
} from './styles';

export function Profile() {
  const { colors } = useContext(ThemeContext);
  const { navigate } = useNavigation();

  return (
    <Container>
      <HeaderContainer>
        <ProfileHeader />
      </HeaderContainer>

      <NavButton onPress={() => navigate('ProfileData')}>
        <ShapeIcon>
          <Feather name="bookmark" size={RFValue(24)} color={colors.primary_dark} />
        </ShapeIcon>
        <NavTextContainer>
          <NavDescription>
            <NavTitle>Meus dados{'\n'}</NavTitle>
            Confira suas informações acadêmicas
          </NavDescription>
        </NavTextContainer>
      </NavButton>

      <NavButton onPress={() => navigate('ProfileTickets')}>
        <ShapeIcon>
          <Feather name="flag" size={RFValue(24)} color={colors.primary_dark} />
        </ShapeIcon>
        <NavTextContainer>
          <NavDescription>
            <NavTitle>Meus tickets{'\n'}</NavTitle>
            Confira e gerencie seus tickets
          </NavDescription>
        </NavTextContainer>
      </NavButton>

      <NavButton onPress={() => navigate('ProfileSettings')}>
        <ShapeIcon>
          <Feather name="settings" size={RFValue(24)} color={colors.primary_dark} />
        </ShapeIcon>
        <NavTextContainer>
          <NavDescription>
            <NavTitle>Preferências{'\n'}</NavTitle>
            Altere o tema e demais configurações
          </NavDescription>
        </NavTextContainer>
      </NavButton>
    </Container>
  )
}
