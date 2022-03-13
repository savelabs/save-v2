import React, { useContext } from 'react';
import { ClienteSuap, InformaçõesTurmaVirtual } from 'suap-sdk-javascript';

import { useQuery } from 'react-query';
import { useAuth } from '../../../../hooks/auth';

import { Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { Nothing } from '../Nothing';

import {
  InfoTitle,
  InfoContainer,
  InfoHeader,
  InfoHeaderText,
  TeacherContainer,
  TeacherProfile,
  TeacherImage,
  TeacherInfos,
  TeacherName,
  TeacherNumber,
  TeacherEmail,
  InfoText,
  InfoEmail,
  InfoGradient,
  InfoLocalContainer,
  InfoMediumText,
} from './styles';

type InfoProps = {
  classID?: number;
}

export function Info({ classID }: InfoProps) {
  const { data } = useAuth();
  const { colors } = useContext(ThemeContext);

  if (!classID) {
    return (
      <Nothing
        title="Informações"
        description="Selecione uma matéria para continuar"
      />
    )
  }

  const clientStudent = new ClienteSuap({
    credenciais: data.credentials,
    usarApenasApi: true
  });

  const {
    data: infos,
    isError,
    isLoading,
    isFetching,
  } = useQuery<InformaçõesTurmaVirtual>(['infos', classID], async () => {
    const studentInfos = await clientStudent.obterDetalhesTurmaVirtual(String(classID));
    return studentInfos;
  }, {
    enabled: !!classID,
  })

  if (isError) {
    return (
      <Nothing
        title="Informações"
        description="Algum erro inesperado ocorreu"
      />
    )
  }

  if (isLoading || isFetching) {
    return <InfoTitle>eooe</InfoTitle>;
  }

  function handleOpenEmail(teacher: string) {
    Linking.openURL(`mailto:${teacher}`)
  }

  return (
    <>
      <InfoTitle>Informações</InfoTitle>

      <InfoContainer>
        <InfoHeader>
          <InfoHeaderText>Professores</InfoHeaderText>
        </InfoHeader>

        {infos?.professores.map(teacher => {
          return (
            <TeacherContainer key={teacher.matricula}>
              <TeacherProfile>
                <TeacherImage source={{ uri: `https://suap.ifrn.edu.br${teacher.foto}` }} />
                <TeacherInfos>
                  <TeacherName>{teacher.nome}</TeacherName>
                  <TeacherNumber>{teacher.matricula}</TeacherNumber>
                </TeacherInfos>
              </TeacherProfile>
              <TeacherEmail>
                <InfoText>{teacher.email}</InfoText>

                <InfoEmail onPress={() => handleOpenEmail(teacher.email)}>
                  <InfoGradient>
                    <Feather name="mail" size={RFValue(24)} color={colors.primary_dark} />
                  </InfoGradient>
                </InfoEmail>
              </TeacherEmail>
            </TeacherContainer>
          )
        })}
      </InfoContainer>

      <InfoContainer>
        <InfoHeader>
          <InfoHeaderText>Disciplina</InfoHeaderText>
        </InfoHeader>
        <InfoLocalContainer>
          <InfoMediumText>Componente Currícular:</InfoMediumText>
          <InfoText>{infos?.componente_curricular}</InfoText>

          {infos?.locais_de_aula && infos?.locais_de_aula.length > 0 && (
            <>
              <InfoMediumText>Locais de Aula:</InfoMediumText>

              {infos?.locais_de_aula.map(classLocal => (
                <InfoText key={classLocal}>{classLocal} {'\n'}</InfoText>
              ))}
            </>
          )}
        </InfoLocalContainer>
      </InfoContainer>
    </>
  )
}
