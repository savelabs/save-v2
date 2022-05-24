import { Feather } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ThemeContext } from 'styled-components/native';
import { InputForm } from '../../../../components/Forms/InputForm';
import { useAuth } from '../../../../hooks/auth';

import { Button } from '../../../../components/Forms/Button';
import * as Yup from 'yup';

import { errorAlert, warningAlert } from '../../../../utils/alert';
import { gql, useMutation } from '@apollo/client';

import {
  Container,
  ReturnContainer,
  ReturnText,
  LoadingContainer,
  CreateArea,

  PeriodContainer,
  PeriodScroll,
  PeriodButton,
  PeriodText,
  PeriodButtonSelected
} from './styles';

export function CreateTickets() {
  const { colors } = useContext(ThemeContext);
  const { goBack, navigate } = useNavigation();
  const { saveCredentials, renewSaveCredentials, student } = useAuth();

  const [type, setType] = useState<'FEATURE' | 'QUESTION' | 'BUG' | null>();

  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    description: Yup.string().required('A descrição é obrigatória'),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  });

  const CREATE_TICKET = gql`
    mutation CreateTicket ($body: String!, $type: TicketType!, $name: String!) {
      createTicket(data: {
        body: $body
        type: $type
        openedBy: $name
        public: true
      })
    }
  `;

  const [mutateFunction] = useMutation(CREATE_TICKET);

  async function onSubmit(formData: any) {
    if (!type) {
      return errorAlert('Escolha uma categoria', 'É necessário escolher uma categoria para criar o seu ticket')
    }

    setLoading(true);
    await renewSaveCredentials();

    try {
      await mutateFunction({
        variables: {
          body: formData.description,
          type,
          name: student?.nome_usual
        },
        context: {
          headers: {
            "Authorization": `Bearer ${saveCredentials?.token}`,
          },
        }
      })

      warningAlert('Ticket Criado', 'Seu ticket foi criado com sucesso!');
      setLoading(false)
      reset();
      setType(null)
      navigate('HomeStack')
    } catch {
      errorAlert('Ocorreu um erro', 'Um erro ocorreu ao criar o seu ticket!')
      setLoading(false)
      reset();
      setType(null)
    }
    setType(null);
    reset();
  }


  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="small" color={colors.primary} />
      </LoadingContainer>
    )
  }

  return (
    <Container>
      <ReturnContainer onPress={() => goBack()}>
        <Feather name="chevron-left" size={RFValue(24)} color={colors.primary_dark} />
        <ReturnText>Voltar</ReturnText>
      </ReturnContainer>

      <CreateArea>
        <PeriodContainer>
          <PeriodScroll>
            {type === 'FEATURE' ? (
              <PeriodButtonSelected>
                <PeriodText>Sugestão</PeriodText>
              </PeriodButtonSelected>
            ) : (
              <PeriodButton onPress={() => setType('FEATURE')}>
                <PeriodText>Sugestão</PeriodText>
              </PeriodButton>
            )}

            {type === 'BUG' ? (
              <PeriodButtonSelected>
                <PeriodText>Erro</PeriodText>
              </PeriodButtonSelected>
            ) : (
              <PeriodButton onPress={() => setType('BUG')}>
                <PeriodText>Erro</PeriodText>
              </PeriodButton>
            )}

            {type === 'QUESTION' ? (
              <PeriodButtonSelected>
                <PeriodText>Outros</PeriodText>
              </PeriodButtonSelected>
            ) : (
              <PeriodButton onPress={() => setType('QUESTION')}>
                <PeriodText>Outros</PeriodText>
              </PeriodButton>
            )}
          </PeriodScroll>
        </PeriodContainer>

        <InputForm
          multiline
          textBox
          name="description"
          title="Descrição"
          control={control}
          placeholder="Descreva o seu ticket"
          numberOfLines={10}
          error={errors.description && errors.description.message}
        />

        <Button onPress={() => handleSubmit(onSubmit)()}> Criar Ticket</Button>
      </CreateArea>
    </Container >
  )
}

