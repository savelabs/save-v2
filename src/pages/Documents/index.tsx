import { gql, useMutation } from '@apollo/client';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Linking, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ThemeContext } from 'styled-components/native';
import { Button } from '../../components/Forms/Button';
import { useAuth } from '../../hooks/auth';

import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';

import {
  Container,
  ReturnContainer,
  ReturnText,
  LoadingContainer,
  ButtonContainer,
  NothingTitle,
  NothingSubtitle
} from './styles';

type Documents = {
  link: string;
  nome: string;
}

export function Documents() {
  const { goBack, navigate } = useNavigation();
  const { colors } = useContext(ThemeContext);
  const { saveCredentials, renewSaveCredentials } = useAuth();

  const [loading, setLoading] = useState(false);
  const [documentLoading, setDocumentLoading] = useState(false);

  const [documents, setDocuments] = useState<Documents[]>();

  const SUAP_REQUEST = gql`
    mutation Suap($requestName: String!, $parameters: JSON!) {
      suap(data: {
        requestName: $requestName,
        parameters: $parameters
      })
    }
  `

  const [suapMutation] = useMutation(SUAP_REQUEST);

  useEffect(() => {
    async function getDocuments() {
      setLoading(true)
      await renewSaveCredentials();

      const documentsResponse = await suapMutation({
        variables: {
          requestName: "obterDocumentos",
          parameters: []
        },
        context: {
          headers: {
            "Authorization": `Bearer ${saveCredentials?.token}`,
            "SUAP-COOKIES": `${saveCredentials?.cookies}`
          }
        }
      })

      setDocuments(documentsResponse.data.suap);
      setLoading(false)
    }
    getDocuments();
  }, [])

  if (documentLoading) {
    return (
      <LoadingContainer>
        <NothingTitle>Aguarde...</NothingTitle>
        <NothingSubtitle>Estamos baixando seu arquivo!</NothingSubtitle>
      </LoadingContainer>
    )
  }

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="small" color={colors.primary} />
      </LoadingContainer>
    )
  }

  async function handleDownloadFile(url: string) {
    setDocumentLoading(true)
    const response = await FileSystem.downloadAsync(`https://save.oulu.ifrn.edu.br/files/documents?link=${url}`,
      FileSystem.documentDirectory + url.split('/')[3] + '.pdf',
      {
        headers: {
          "Authorization": `Bearer ${saveCredentials?.token}`,
          "SUAP-COOKIES": `${saveCredentials?.cookies}`
        }
      }
    )

    if (Platform.OS === 'ios') {
      return Linking.openURL(response.uri);
    }

    const cUri = await FileSystem.getContentUriAsync(response.uri);
    setDocumentLoading(false)

    await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
      data: cUri,
      flags: 1,
      type: "application/pdf",
    });
  }

  return (
    <Container>
      <ReturnContainer onPress={() => goBack()}>
        <Feather name="chevron-left" size={RFValue(24)} color={colors.primary_dark} />
        <ReturnText>Home</ReturnText>
      </ReturnContainer>

      {documents?.map(document => (
        <ButtonContainer key={document.link}>
          <Button

            onPress={() => handleDownloadFile(document.link)}
          >
            {document.nome}
          </Button>
        </ButtonContainer>
      ))}
    </Container>
  )
}
