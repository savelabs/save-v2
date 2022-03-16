import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import { ThemeContext } from 'styled-components';
import { ProfileHeader } from '../components/ProfileHeader';

import {
  Container,
  HeaderContainer,
  ReturnContainer,
  ReturnText,

  ButtonContainer,
  UploadButton,
  UploadText
} from './styles';

export function ProfileEdit() {
  const { goBack } = useNavigation();
  const { colors } = useContext(ThemeContext);

  return (
    <Container>
      <ReturnContainer onPress={() => goBack()}>
        <Feather name="chevron-left" size={RFValue(24)} color={colors.primary_dark} />
        <ReturnText>Perfil</ReturnText>
      </ReturnContainer>

      <HeaderContainer>
        <ProfileHeader editMode />
      </HeaderContainer>

      <ButtonContainer>
        <TouchableOpacity onPress={() => { }}>
          <UploadButton>
            <UploadText>ALTERAR FOTO DE PERFIL</UploadText>
            <Feather name="upload" size={RFValue(24)} color={colors.primary_dark} />
          </UploadButton>
        </TouchableOpacity>
      </ButtonContainer>
    </Container>
  )
}
