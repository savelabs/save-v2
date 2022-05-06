import React, { useState, useEffect, useContext } from 'react';

import { gql, useMutation } from '@apollo/client';
import { useAuth } from '../../../../hooks/auth';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

import { ThemeContext } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import {
  Container,
  ReturnContainer,
  ReturnText,
  LoadingContainer,
  GradeSubjectContainer,
  SubjectTitle,
  SubjectRegular,
  CardContainer,
  InfoContainer
} from './styles';


type Grade = {
  "Descrição": string;
  "Nota Obtida": string;
  "Peso": string;
  "Sigla": string;
  "Tipo": string;
}

type DetailedGrade = {
  "Etapa 1 - Média Aritmética": Grade[];
  "Etapa 2 - Média Aritmética": Grade[];
  "Etapa 3 - Média Aritmética": Grade[];
  "Etapa 4 - Média Aritmética": Grade[];
  "Etapa Final - Média Aritmética": Grade[];
}

type ParamsProps = {
  classID: string;
}


export function DetailGrades() {
  const [loading, setLoading] = useState(false);
  const { saveCredentials, renewSaveCredentials } = useAuth();
  const { goBack } = useNavigation();
  const { colors } = useContext(ThemeContext);

  const [detailedGrades, setDetailedGrades] = useState<DetailedGrade>();

  const { params } = useRoute();
  const { classID } = params as ParamsProps;

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
    async function getDetailedGrades() {
      setLoading(true)
      await renewSaveCredentials();

      try {
        const response = await suapMutation({
          variables: {
            requestName: "detalharNota",
            parameters: [classID]
          },
          context: {
            headers: {
              "Authorization": `Bearer ${saveCredentials?.token}`,
              "SUAP-COOKIES": `${saveCredentials?.cookies}`
            }
          }
        })

        setDetailedGrades(response.data.suap['Detalhamento das Notas']);
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    getDetailedGrades();

  }, [])

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="small" color={colors.primary} />
      </LoadingContainer>
    )
  }

  return (
    <>

      <Container>
        <ReturnContainer onPress={() => goBack()}>
          <Feather name="chevron-left" size={RFValue(24)} color={colors.primary_dark} />
          <ReturnText>Matéria</ReturnText>
        </ReturnContainer>
        <GradeSubjectContainer>
          <SubjectTitle>Etapa 1 - Média Aritmética</SubjectTitle>
          {detailedGrades?.['Etapa 1 - Média Aritmética'].map(grade => {
            return (
              <CardContainer key={'E1'.concat(grade['Nota Obtida'], grade.Descrição)}>
                <InfoContainer>
                  <SubjectTitle>Descrição:</SubjectTitle><SubjectRegular>{grade.Descrição}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Nota:</SubjectTitle><SubjectRegular>{grade['Nota Obtida'] === "" ? '-' : grade['Nota Obtida']}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Peso:</SubjectTitle><SubjectRegular>{grade.Peso}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Sigla:</SubjectTitle><SubjectRegular>{grade.Sigla}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Tipo:</SubjectTitle><SubjectRegular>{grade.Tipo}</SubjectRegular>
                </InfoContainer>
              </CardContainer>
            )
          })}
        </GradeSubjectContainer>
        <GradeSubjectContainer>
          <SubjectTitle>Etapa 2 - Média Aritmética</SubjectTitle>
          {detailedGrades?.['Etapa 2 - Média Aritmética'].map(grade => {
            return (
              <CardContainer key={'E2'.concat(grade['Nota Obtida'], grade.Descrição)}>
                <InfoContainer>
                  <SubjectTitle>Descrição:</SubjectTitle><SubjectRegular>{grade.Descrição}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Nota:</SubjectTitle><SubjectRegular>{grade['Nota Obtida'] === "" ? '-' : grade['Nota Obtida']}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Peso:</SubjectTitle><SubjectRegular>{grade.Peso}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Sigla:</SubjectTitle><SubjectRegular>{grade.Sigla}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Tipo:</SubjectTitle><SubjectRegular>{grade.Tipo}</SubjectRegular>
                </InfoContainer>
              </CardContainer>
            )
          })}
        </GradeSubjectContainer>
        <GradeSubjectContainer>
          <SubjectTitle>Etapa 3 - Média Aritmética</SubjectTitle>
          {detailedGrades?.['Etapa 3 - Média Aritmética'].map(grade => {
            return (
              <CardContainer key={'E3'.concat(grade['Nota Obtida'], grade.Descrição)}>
                <InfoContainer>
                  <SubjectTitle>Descrição:</SubjectTitle><SubjectRegular>{grade.Descrição}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Nota:</SubjectTitle><SubjectRegular>{grade['Nota Obtida'] === "" ? '-' : grade['Nota Obtida']}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Peso:</SubjectTitle><SubjectRegular>{grade.Peso}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Sigla:</SubjectTitle><SubjectRegular>{grade.Sigla}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Tipo:</SubjectTitle><SubjectRegular>{grade.Tipo}</SubjectRegular>
                </InfoContainer>
              </CardContainer>
            )
          })}
        </GradeSubjectContainer>
        <GradeSubjectContainer>
          <SubjectTitle>Etapa 4 - Média Aritmética</SubjectTitle>
          {detailedGrades?.['Etapa 4 - Média Aritmética'].map(grade => {
            return (
              <CardContainer key={'E4'.concat(grade['Nota Obtida'], grade.Descrição)}>
                <InfoContainer>
                  <SubjectTitle>Descrição:</SubjectTitle><SubjectRegular>{grade.Descrição}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Nota:</SubjectTitle><SubjectRegular>{grade['Nota Obtida'] === "" ? '-' : grade['Nota Obtida']}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Peso:</SubjectTitle><SubjectRegular>{grade.Peso}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Sigla:</SubjectTitle><SubjectRegular>{grade.Sigla}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Tipo:</SubjectTitle><SubjectRegular>{grade.Tipo}</SubjectRegular>
                </InfoContainer>
              </CardContainer>
            )
          })}
        </GradeSubjectContainer>
        <GradeSubjectContainer>
          <SubjectTitle>Etapa Final - Média Aritmética</SubjectTitle>
          {detailedGrades?.['Etapa Final - Média Aritmética'].map(grade => {
            return (
              <CardContainer key={'MF'.concat(grade['Nota Obtida'], grade.Descrição)}>
                <InfoContainer>
                  <SubjectTitle>Descrição:</SubjectTitle><SubjectRegular>{grade.Descrição}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Nota:</SubjectTitle><SubjectRegular>{grade['Nota Obtida'] === "" ? '-' : grade['Nota Obtida']}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Peso:</SubjectTitle><SubjectRegular>{grade.Peso}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Sigla:</SubjectTitle><SubjectRegular>{grade.Sigla}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Tipo:</SubjectTitle><SubjectRegular>{grade.Tipo}</SubjectRegular>
                </InfoContainer>
              </CardContainer>
            )
          })}
        </GradeSubjectContainer>

      </Container>
    </>
  )
}
