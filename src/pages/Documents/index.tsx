import { gql, useMutation } from '@apollo/client';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ThemeContext } from 'styled-components/native';
import { Button } from '../../components/Forms/Button';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  ReturnContainer,
  ReturnText,
  LoadingContainer
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

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="small" color={colors.primary} />
      </LoadingContainer>
    )
  }

  async function handleDownloadFile(url: string) {
    const { data } = await axios.get(`https://suap.ifrn.edu.br${url}`, {
      responseType: "arraybuffer",
      headers: {
        'Cookie': `${saveCredentials?.cookies}`
      }
    })

  }

  return (
    <Container>
      <ReturnContainer onPress={() => goBack()}>
        <Feather name="chevron-left" size={RFValue(24)} color={colors.primary_dark} />
        <ReturnText>Home</ReturnText>
      </ReturnContainer>
      {documents?.map(document => (
        <Button
          key={document.link}
          onPress={() => handleDownloadFile(document.link)}
        >
          {document.nome}
        </Button>
      ))}
    </Container>
  )
}
