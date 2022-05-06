import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ThemeContext } from 'styled-components/native';
import { useAuth } from '../../../hooks/auth';
import { useThemeMode } from '../../../hooks/theme';
import { ProfileHeader } from '../components/ProfileHeader';

import SecurityImage from '../../../assets/security.svg';

import {
  Container,
  HeaderContainer,
  NavButton,
  ShapeIcon,
  NavTextContainer,
  NavTitle,
  NavDescription,

  ReturnContainer,
  ReturnText,

  ImageContainer,
  ModalOverlayContainer,
  ModalContainer,
  ModalText,
  ModalButton,
  ModalTextButton,
  ModalTextSecurity
} from './styles';

type ThemeProps = 'auto' | 'dark' | 'light'

export function ProfileSettings() {
  const { student } = useAuth();
  const { theme, setTheme } = useThemeMode();

  const { goBack } = useNavigation();
  const { colors } = useContext(ThemeContext);

  const [themeSelected, setThemeSelected] = useState<ThemeProps>('auto');
  const [isModalThemeVisible, setIsModalThemeVisible] = useState(false);
  const [isModalNotificationVisible, setIsModalNotificationVisible] = useState(false);

  useEffect(() => {
    if (theme) {
      setThemeSelected(theme as ThemeProps);
    }
  }, [theme])

  function handleSetTheme(theme: ThemeProps) {
    setTheme(theme);
    setIsModalThemeVisible(false)
    setThemeSelected(theme);
  }

  return (
    <>
      <Modal
        animationType="slide"
        visible={isModalNotificationVisible}
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={() => setIsModalNotificationVisible(false)}>
          <ModalOverlayContainer />
        </TouchableWithoutFeedback>
        <ModalContainer>
          <ModalText>
            Selecione uma opção
          </ModalText>
          <ImageContainer>
            <SecurityImage />
          </ImageContainer>
          <ModalTextSecurity>
            Ao ativar as notificações escolares você concorda com nossos termos, nos permitindo criptografar e armazenar alguns dados sensíveis, dentre eles a sua senha e seu boletim escolar. Você pode desativar quando quiser e suas informações serão apagadas automaticamente.
          </ModalTextSecurity>
          <ModalButton selected onPress={() => setIsModalNotificationVisible(false)}>
            <ModalTextButton>Em breve</ModalTextButton>
          </ModalButton>
          <ModalButton onPress={() => setIsModalNotificationVisible(false)}>
            <ModalTextButton>Desativar</ModalTextButton>
          </ModalButton>
        </ModalContainer>
      </Modal>

      <Modal
        animationType="slide"
        visible={isModalThemeVisible}
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={() => setIsModalThemeVisible(false)}>
          <ModalOverlayContainer />
        </TouchableWithoutFeedback>
        <ModalContainer>
          <ModalText>
            Selecione uma opção
          </ModalText>
          <ModalButton selected={themeSelected === 'auto'} onPress={() => handleSetTheme('auto')}>
            <ModalTextButton>Automático</ModalTextButton>
          </ModalButton>
          <ModalButton selected={themeSelected === 'dark'} onPress={() => handleSetTheme('dark')}>
            <ModalTextButton>Escuro</ModalTextButton>
          </ModalButton>
          <ModalButton selected={themeSelected === 'light'} onPress={() => handleSetTheme('light')}>
            <ModalTextButton>Claro</ModalTextButton>
          </ModalButton>
        </ModalContainer>
      </Modal>

      <Container>
        <ReturnContainer onPress={() => goBack()}>
          <Feather name="chevron-left" size={RFValue(24)} color={colors.primary_dark} />
          <ReturnText>Perfil</ReturnText>
        </ReturnContainer>

        <HeaderContainer>
          <ProfileHeader />
        </HeaderContainer>

        <NavButton onPress={() => setIsModalThemeVisible(true)}>
          <ShapeIcon>
            <Feather name="moon" size={RFValue(24)} color={colors.primary_dark} />
          </ShapeIcon>
          <NavTextContainer>
            <NavDescription>
              <NavTitle>Tema{'\n'}</NavTitle>
              {theme === 'auto' ? 'Automático' : theme === 'light' ? 'Claro' : 'Escuro'}
            </NavDescription>
            <Feather name="chevron-down" size={RFValue(24)} color={colors.primary_dark} />
          </NavTextContainer>
        </NavButton>

        <NavButton onPress={() => setIsModalNotificationVisible(true)}>
          <ShapeIcon>
            <Feather name="bell" size={RFValue(24)} color={colors.primary_dark} />
          </ShapeIcon>
          <NavTextContainer>
            <NavDescription>
              <NavTitle>Notificações Escolares{'\n'}</NavTitle>
              Ativado
            </NavDescription>
            <Feather name="chevron-down" size={RFValue(24)} color={colors.primary_dark} />
          </NavTextContainer>
        </NavButton>

      </Container>
    </>
  )
}
