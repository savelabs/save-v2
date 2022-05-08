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
import { Nothing } from '../Nothing';
import { errorAlert } from '../../../../utils/alert';


type DetailedGrade = {
  step: string;
  description: string;
  gradeValue: string;
  weight: string;
  initials: string;
  type: string;
}


type ParamsProps = {
  classID: string;
  period: string;
}


export function DetailGrades() {
  const [loading, setLoading] = useState(false);
  const { saveCredentials, renewSaveCredentials } = useAuth();
  const { goBack } = useNavigation();
  const { colors } = useContext(ThemeContext);

  const [detailedGrades, setDetailedGrades] = useState<DetailedGrade[]>();

  const { params } = useRoute();
  const { classID, period } = params as ParamsProps;

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
      const periodSplitted = period.split('.');

      try {
        const response = await suapMutation({
          variables: {
            requestName: "detalharNota",
            parameters: [classID, periodSplitted[0], periodSplitted[1]]
          },
          context: {
            headers: {
              "Authorization": `Bearer ${saveCredentials?.token}`,
              "SUAP-COOKIES": `${saveCredentials?.cookies}`
            }
          }
        })

        const detailed = Object.entries(response.data.suap['Detalhamento das Notas'])
        const formatedDetailed = detailed.map((step: any) => {
          return ({
            step: step[0],
            description: step[1][0]['Descrição'],
            gradeValue: step[1][0]['Nota Obtida'],
            weight: step[1][0]['Peso'],
            initials: step[1][0]['Sigla'],
            type: step[1][0]['Tipo'],
          })
        })

        setDetailedGrades(formatedDetailed);
        setLoading(false)
      } catch (err) {
        setLoading(false);
        errorAlert('Erro Inesperado', 'Abra um ticket e contate-nos para resolver o problema.')
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

  if (!detailedGrades && !loading) {
    return (
      <LoadingContainer>
        <Nothing
          title="Detalhamento"
          description="Algum erro ocorreu"
        />
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

        {detailedGrades?.map(grade => {
          return (
            <GradeSubjectContainer key={grade.step}>
              <SubjectTitle>{grade.step}</SubjectTitle>
              <CardContainer>
                <InfoContainer>
                  <SubjectTitle>Descrição:</SubjectTitle><SubjectRegular>{grade.description}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Nota:</SubjectTitle><SubjectRegular>{grade.gradeValue === "" ? '-' : grade.gradeValue}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Peso:</SubjectTitle><SubjectRegular>{grade.weight}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Sigla:</SubjectTitle><SubjectRegular>{grade.initials}</SubjectRegular>
                </InfoContainer>
                <InfoContainer>
                  <SubjectTitle>Tipo:</SubjectTitle><SubjectRegular>{grade.type}</SubjectRegular>
                </InfoContainer>
              </CardContainer>
            </GradeSubjectContainer>
          )
        })}
      </Container>
    </>
  )
}
