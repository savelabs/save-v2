import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ThemeContext } from 'styled-components/native';
import { useAuth } from '../../../hooks/auth';
import { format } from 'date-fns';
import { errorAlert, warningAlert } from '../../../utils/alert';

import {
  Container,
  ReturnContainer,
  ReturnText,
  LoadingContainer,

  HeaderContainer,
  CreateButton,
  CreateText,
  NothingTitle,
  NothingSubtitle,
  ShapeIcon,

  TicketContainer,
  RegularText,
  SemiboldText,
  Title,

  ModalOverlayContainer,
  ModalContainer,
  ModalText,
  ModalButton,
  ModalTextButton,
} from './styles';


type Ticket = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  status: string;
  createdAt: string;
}

export function ProfileTickets() {
  const { colors } = useContext(ThemeContext);
  const { goBack, navigate } = useNavigation();
  const { saveCredentials, renewSaveCredentials } = useAuth();

  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[] | null>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [deleteID, setDeleteID] = useState('');

  const GET_TICKETS = gql`
    query Tickets {
      getTickets {
        id,
        title,
        body,
        tags,
        status,
        createdAt
      }
    }
  `
  const DELETE_TICKETS = gql`
    mutation DeleteTicket ($id: String!) {
      deleteTicket(id: $id)
    }
  `

  const [getTickets] = useLazyQuery(GET_TICKETS);
  const [deleteTickets] = useMutation(DELETE_TICKETS);

  async function handleDeleteTicket() {
    setLoading(true)
    await renewSaveCredentials();

    try {
      await deleteTickets({
        variables: {
          id: deleteID
        },
        context: {
          headers: {
            "Authorization": `Bearer ${saveCredentials?.token}`,
          }
        }
      })

      const response = await getTickets({
        context: {
          headers: {
            "Authorization": `Bearer ${saveCredentials?.token}`,
          }
        }
      })

      setDeleteID('')
      setModalVisible(false);
      setTickets(response.data.getTickets.length > 0 ? response.data.getTickets : null);
      warningAlert('Ticket Deletado', 'Seu ticket foi deletado com sucesso!');
      setLoading(false)
    } catch (err) {
      console.log(err)
      setModalVisible(false);
      setDeleteID('')
      errorAlert('Ocorreu um erro', 'Um erro ocorreu ao deletar o seu ticket!')
      setLoading(false)
    }
  }

  useEffect(() => {
    async function updateTickets() {
      setLoading(true)
      await renewSaveCredentials();

      const response = await getTickets({
        context: {
          headers: {
            "Authorization": `Bearer ${saveCredentials?.token}`,
          }
        }
      })

      setTickets(response.data.getTickets.length > 0 ? response.data.getTickets : null);
      setLoading(false)
    }
    updateTickets();
  }, [])

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="small" color={colors.primary} />
      </LoadingContainer>
    )
  }

  if (!tickets) {
    return (

      <Container>
        <ReturnContainer onPress={() => goBack()}>
          <Feather name="chevron-left" size={RFValue(24)} color={colors.primary_dark} />
          <ReturnText>Voltar</ReturnText>
        </ReturnContainer>

        <LoadingContainer>
          <NothingTitle>Tickets</NothingTitle>
          <NothingSubtitle>Você não possuí nenhum ticket, que tal criar um?</NothingSubtitle>

          <TouchableOpacity onPress={() => navigate('CreateTickets')}>
            <CreateButton>
              <CreateText>NOVO TICKET</CreateText>
              <Feather name="plus-circle" size={RFValue(24)} color={colors.primary_dark} />
            </CreateButton>
          </TouchableOpacity>
        </LoadingContainer>
      </Container>
    )
  }

  return (
    <>
      <Modal
        animationType="slide"
        visible={isModalVisible}
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <ModalOverlayContainer />
        </TouchableWithoutFeedback>

        <ModalContainer>
          <ModalText>
            Deseja mesmo deletar?
          </ModalText>
          <ModalButton alertButton onPress={() => handleDeleteTicket()}>
            <ModalTextButton>Deletar</ModalTextButton>
          </ModalButton>
          <ModalButton onPress={() => setModalVisible(false)}>
            <ModalTextButton>Cancelar</ModalTextButton>
          </ModalButton>
        </ModalContainer>
      </Modal>

      <Container>
        <ReturnContainer onPress={() => goBack()}>
          <Feather name="chevron-left" size={RFValue(24)} color={colors.primary_dark} />
          <ReturnText>Voltar</ReturnText>
        </ReturnContainer>

        <HeaderContainer>
          <Title>Meus Tickets</Title>
          <TouchableOpacity onPress={() => navigate('CreateTickets')}>
            <CreateButton>
              <CreateText>NOVO TICKET</CreateText>
              <Feather name="plus-circle" size={RFValue(24)} color={colors.primary_dark} />
            </CreateButton>
          </TouchableOpacity>
        </HeaderContainer>
        {tickets.map(ticket => {
          return (
            <TicketContainer key={ticket.id}>
              <View>
                <SemiboldText>{format(new Date(ticket.createdAt), 'dd/MM/yyyy')} - {ticket.tags[0] === 'Feature request' ? 'Sugestão' : ticket.tags[0] === 'Bug report' ? 'Erro' : 'Outros'}</SemiboldText>
                {ticket.status === 'ACTIVE' ? (
                  <RegularText>
                    <SemiboldText>Status:</SemiboldText> Aberto
                  </RegularText>
                ) : (
                  <RegularText>
                    <SemiboldText>Status:</SemiboldText> Fechado
                  </RegularText>
                )}
                <RegularText>{ticket.body.split('\n')[0]}</RegularText>
              </View>
              <TouchableOpacity onPress={() => {
                setModalVisible(true)
                setDeleteID(ticket.id)
              }}>
                <ShapeIcon>
                  <Feather name="trash-2" size={RFValue(24)} color={colors.primary_dark} />
                </ShapeIcon>
              </TouchableOpacity>
            </TicketContainer>
          )
        })}
      </Container>
    </>
  )
}
