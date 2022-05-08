import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { RFValue } from "react-native-responsive-fontsize";
import { ThemeContext } from 'styled-components/native';
import { useAuth } from '../../hooks/auth';
import { ActivityIndicator, Modal, Share, TouchableWithoutFeedback, View } from 'react-native';

import ShareImage from '../../assets/share.svg';
import { warningAlert } from '../../utils/alert';

import {
  LoadingContainer,
  StudentName,
  HeaderContainer,
  Hello,
  NavContainer,
  UserImage,
  Container,
  UserButton,
  BellContainer,
  CardContainer,
  FlexContainer,
  CardTitle,
  CardText,
  CardBox,
  ImageContainer,
  ShareButton,
  CardBoxButton,
  CardTextMedium,

  ModalOverlayContainer,
  ModalContainer,
  ModalText,
  ModalButton,
  ModalTextButton,
} from './styles';


export function Home() {
  const { navigate } = useNavigation();
  const { renew, student, renewSaveCredentials, saveStudent } = useAuth();
  const { colors } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [isShareModalVisible, setShareModalVisible] = useState(false);

  useEffect(() => {
    async function getSaveCredentials() {
      setLoadingSave(true)
      await renewSaveCredentials()
      setLoadingSave(false)
    }
    getSaveCredentials()
  }, [])

  useEffect(() => {
    async function getUpdatedData() {
      setLoading(true);
      await renew();

      setLoading(false);
    }
    getUpdatedData();
  }, [])

  const avatarSuap = saveStudent?.photoHref ? `https://save.oulu.ifrn.edu.br/static/${saveStudent.photoHref}` : student.url_foto_150x200.substring(0, 5) === 'https' ? student.url_foto_150x200 : `https://suap.ifrn.edu.br${student.url_foto_150x200}`;

  function handleNavigateToProfile() {
    navigate('Profile');
  }

  function handleNavigateToNotification() {
    navigate('Notification')
  }

  function handleShare() {
    Share.share({
      message: `Olá, aluno do IFRN! Já imaginou ter o SUAP simples e descomplicado em suas mãos? Conheça o Save, o Assistente Virtual que decola seus estudos! Consultar o SUAP nunca foi tão fácil. Não deixe de conferir!${'\n'}${'\n'}GooglePlay: https://bit.ly/save_android${'\n'}AppStore: Em Breve.`,
    });
  }

  if (loading) {
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
            <BellContainer onPress={() => warningAlert('Em breve', 'Um novo sistema de notificações está sendo construído')}>
              <Feather name="bell" size={RFValue(24)} color={colors.text_white} />
            </BellContainer>
            <UserButton onPress={handleNavigateToProfile}>
              <ActivityIndicator size="small" color={colors.background} />
            </UserButton>
          </NavContainer>
        </HeaderContainer>
        <LoadingContainer>
          <ActivityIndicator size="small" color={colors.primary} />
        </LoadingContainer>
      </>
    );
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

      <HeaderContainer>
        <Hello>
          Olá,
          {" \n"}
          <StudentName>
            {student.nome_usual}
          </StudentName>
        </Hello>
        <NavContainer>
          <BellContainer onPress={() => warningAlert('Em breve', 'Um novo sistema de notificações está sendo construído')}>
            <Feather name="bell" size={RFValue(24)} color={colors.text_white} />
          </BellContainer>
          <UserButton onPress={handleNavigateToProfile}>
            {loadingSave
              ? <ActivityIndicator size="small" color={colors.background} />
              : <UserImage source={{ uri: avatarSuap }} />
            }
          </UserButton>
        </NavContainer>
      </HeaderContainer>
      <Container>
        {/*
        <CardContainer>
          <CardTitle>Meus Documentos</CardTitle>
          <CardText>Baixar documentos acadêmicos</CardText>
          <CardBoxButton disabled={loadingSave} onPress={() => navigate('Documents')}>
            <CardTextMedium>{loadingSave ? 'Carregando...' : 'Ver Documentos'}</CardTextMedium>
            < Feather name="log-in" size={RFValue(24)} color={colors.primary_dark} />
          </CardBoxButton>
        </CardContainer>
        */}
        <CardContainer>
          <CardTitle>Save 2.0</CardTitle>
          <CardText>Estamos em testes, iremos desbloquear as funções ao longo das próximas semanas.</CardText>
        </CardContainer>
        <CardContainer>
          <CardTitle>Tickets</CardTitle>
          <CardText>Você tem alguma sugestão ou erro?</CardText>
          <CardBoxButton onPress={() => warningAlert('Em breve', 'Um novo sistema de tickets está sendo construído')}>
            <CardTextMedium>Criar um Ticket</CardTextMedium>
            <Feather name="log-in" size={RFValue(24)} color={colors.primary_dark} />
          </CardBoxButton>
        </CardContainer>
        <CardContainer>
          <FlexContainer>
            <View>
              <CardTitle>Compartilhe!</CardTitle>
              <CardText>Compartilhe e nos{'\n'}ajude a melhorar!</CardText>
              <ShareButton onPress={() => setShareModalVisible(true)}>
                <Feather name="share" size={RFValue(24)} color={colors.primary_dark} />
              </ShareButton>
            </View>
            <ImageContainer>
              <ShareImage height={100} />
            </ImageContainer>
          </FlexContainer>
        </CardContainer>
      </Container>
    </>
  )
}
