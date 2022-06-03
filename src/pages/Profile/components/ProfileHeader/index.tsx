import { Feather } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { Modal, Share, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import { ThemeContext } from 'styled-components/native';
import { useAuth } from '../../../../hooks/auth';

import { useNavigation } from '@react-navigation/native';

import ShareDark from '../../../../assets/shareDark.svg';
import ShareLight from '../../../../assets/shareLight.svg';
import SignOutImage from '../../../../assets/sign-out-image.svg';
import ShareImage from '../../../../assets/share.svg';

import {
  Container,
  StudentImage,
  StudentImageButton,
  StudentName,
  StudentSchoolID,
  OptionsContainer,
  SingOutButton,
  SingOutText,
  IconButton,

  ModalOverlayContainer,
  ModalContainer,
  ModalText,
  ModalButton,
  ModalTextButton,
} from './styles';


type ProfileHeaderProps = {
  editMode?: boolean;
}

export function ProfileHeader({ editMode }: ProfileHeaderProps) {
  const { colors, theme } = useContext(ThemeContext);
  const { student, signOut, saveStudent, saveCredentials } = useAuth();
  const { navigate, goBack } = useNavigation();

  const [isShareModalVisible, setShareModalVisible] = useState(false);
  const [isSignOutModalVisible, setSignOutModalVisible] = useState(false);

  const avatarSuap = saveStudent?.photoHref ? `https://save.oulu.ifrn.edu.br${saveStudent.photoHref}` : student.url_foto_150x200.substring(0, 5) === 'https' ? student.url_foto_150x200 : `https://suap.ifrn.edu.br${student.url_foto_150x200}`;

  function handleShare() {
    Share.share({
      message: `Olá, aluno do IFRN! Já imaginou ter o SUAP simples e descomplicado em suas mãos? Conheça o Save, o Assistente Virtual que decola seus estudos! Consultar o SUAP nunca foi tão fácil. Não deixe de conferir!${'\n'}${'\n'}GooglePlay: https://bit.ly/save_android${'\n'}AppStore: Em Breve.`,
    });
  }

  return (
    <>
      <Modal
        animationType="slide"
        visible={isShareModalVisible}
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={() => setShareModalVisible(false)}>
          <ModalOverlayContainer />
        </TouchableWithoutFeedback>

        <ModalContainer>
          <ModalText>
            Compartilhe com
            {'\n'}
            seus amigos
          </ModalText>
          <ShareImage />
          <ModalButton alertButton onPress={() => handleShare()}>
            <ModalTextButton>Compartilhar</ModalTextButton>
          </ModalButton>
          <ModalButton onPress={() => setShareModalVisible(false)}>
            <ModalTextButton>Cancelar</ModalTextButton>
          </ModalButton>
        </ModalContainer>
      </Modal>

      <Modal
        animationType="slide"
        visible={isSignOutModalVisible}
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={() => setSignOutModalVisible(false)}>
          <ModalOverlayContainer />
        </TouchableWithoutFeedback>

        <ModalContainer>
          <ModalText>
            Deseja mesmo sair?
          </ModalText>
          <SignOutImage />
          <ModalButton alertButton onPress={() => signOut()}>
            <ModalTextButton>Sair</ModalTextButton>
          </ModalButton>
          <ModalButton onPress={() => setSignOutModalVisible(false)}>
            <ModalTextButton>Cancelar</ModalTextButton>
          </ModalButton>
        </ModalContainer>
      </Modal>

      <Container>
        <StudentImageButton onPress={() => navigate('ProfileEdit')}>
          <StudentImage
            source={{
              uri: avatarSuap, headers: {
                "Authorization": `Bearer ${saveCredentials?.token}`
              }
            }}
          />
        </StudentImageButton>
        <StudentName>{student.vinculo.nome}</StudentName>
        <StudentSchoolID>{student.matricula}</StudentSchoolID>
        <OptionsContainer>
          <TouchableOpacity onPress={() => setSignOutModalVisible(true)}>
            <SingOutButton>
              <SingOutText>SAIR</SingOutText>
            </SingOutButton>
          </TouchableOpacity>
          {editMode ? (
            <IconButton onPress={() => goBack()}>
              <Feather name="x-square" size={RFValue(24)} color={colors.primary_dark} />
            </IconButton>
          ) : (
            <IconButton onPress={() => navigate('ProfileEdit')}>
              <Feather name="edit" size={RFValue(24)} color={colors.primary_dark} />
            </IconButton>
          )}
          <IconButton onPress={() => setShareModalVisible(true)}>
            {theme === 'light' ? <ShareLight /> : <ShareDark />}
          </IconButton>
        </OptionsContainer>
      </Container>
    </>
  )
}
