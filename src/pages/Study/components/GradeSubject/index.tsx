import React, { useContext } from 'react';
import { Boletim, ClienteSuap } from 'suap-sdk-javascript';

import { useQuery } from 'react-query';
import { useAuth } from '../../../../hooks/auth';
import { Nothing } from '../Nothing';
import { AcademicSituation } from '../GetAcademicSituation'

import { LoadingSpinner } from '../LoadingSpinner';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import { ThemeContext } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import {
  GradeSubjectContainer,
  GradeSquadContainerBottom,
  GradeBottomSubject,
  SubjectTitle,
  SubjectRegular,
  GradeSquadContainer,
  GradeSquad,
  GradeText,
  GradeSquadBox,

  CardContainer,
  DetailsHeader,
  DetailsButton,
  CardTitle,
  CardPadding,

  CardBar,
  ProgressBar
} from './styles';

type GradeSubjectProps = {
  period: string;
  classID?: number;
}

export function GradeSubject({ classID, period }: GradeSubjectProps) {
  const { data } = useAuth();
  const { colors } = useContext(ThemeContext);
  const { navigate } = useNavigation();

  if (!period) {
    return (
      <Nothing
        title="Notas"
        description="Selecione um período letivo para continuar"
      />
    )
  }

  if (!classID) {
    return (
      <Nothing
        title="Notas"
        description="Selecione uma matéria para continuar"
      />
    )
  }

  const clientStudent = new ClienteSuap({
    credenciais: data.credentials,
    usarApenasApi: true
  });

  const periodFormatted = period.split('.')

  const {
    data: grades,
    isError,
    isLoading,
    isFetching,
  } = useQuery<Boletim[]>(['grades', period], async () => {
    const studentGrades = await clientStudent.obterNotas(
      Number(periodFormatted[0]),
      Number(periodFormatted[1])
    );
    return studentGrades;
  }, {
    enabled: !!period
  })

  if (isError) {
    return (
      <Nothing
        title="Notas"
        description="Algum erro inesperado ocorreu"
      />
    )
  }
  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  const currentSubject = grades?.find((grade) => grade.codigo_diario === String(classID));

  if (!currentSubject) {
    return (
      <Nothing
        title="Notas"
        description="Algum erro inesperado ocorreu"
      />
    )
  }

  const subjectFormat = currentSubject.disciplina.split('- ');
  const subject = subjectFormat ? subjectFormat[1] : '';

  const gradeOne = currentSubject.segundo_semestre
    ? null
    : currentSubject.nota_etapa_1.nota;
  const gradeTwo = currentSubject.segundo_semestre
    ? null
    : currentSubject.nota_etapa_2.nota;
  const gradeThree = currentSubject.segundo_semestre
    ? currentSubject.nota_etapa_1.nota
    : currentSubject.nota_etapa_3.nota;
  const gradeFour = currentSubject.segundo_semestre
    ? currentSubject.nota_etapa_2.nota
    : currentSubject.nota_etapa_4.nota;

  return (
    <GradeSubjectContainer>
      <SubjectTitle>{subject}</SubjectTitle>
      <GradeSquadContainer>
        <GradeSquadBox>
          <GradeSquad>
            <GradeText>{gradeOne || '-'}</GradeText>
          </GradeSquad>
          <SubjectRegular>1° BI</SubjectRegular>
        </GradeSquadBox>
        <GradeSquadBox>
          <GradeSquad>
            <GradeText>{gradeTwo || '-'}</GradeText>
          </GradeSquad>
          <SubjectRegular>2° BI</SubjectRegular>
        </GradeSquadBox>
        <GradeSquadBox>
          <GradeSquad>
            <GradeText>{gradeThree || '-'}</GradeText>
          </GradeSquad>
          <SubjectRegular>3° BI</SubjectRegular>
        </GradeSquadBox>
        <GradeSquadBox>
          <GradeSquad>
            <GradeText>{gradeFour || '-'}</GradeText>
          </GradeSquad>
          <SubjectRegular>4° BI</SubjectRegular>
        </GradeSquadBox>
      </GradeSquadContainer>

      {period === '2022.1' && (
        <CardContainer>
          <DetailsButton onPress={() => navigate('DetailGrades', {
            classID
          })}>
            <DetailsHeader>
              <SubjectTitle>Detalhar Notas</SubjectTitle>
              <Feather name="plus-circle" size={RFValue(24)} color={colors.primary_dark} />
            </DetailsHeader>
          </DetailsButton>
        </CardContainer>
      )}

      <CardContainer>
        <CardPadding>
          <CardTitle>Situação</CardTitle>
          <AcademicSituation
            situacao={currentSubject.situacao}
            segundo_semestre={currentSubject.segundo_semestre}
            quantidade_avaliacoes={currentSubject.quantidade_avaliacoes}
            nota_avaliacao_final={currentSubject.nota_avaliacao_final}
            nota_etapa_1={currentSubject.nota_etapa_1}
            nota_etapa_2={currentSubject.nota_etapa_2}
            nota_etapa_3={currentSubject.nota_etapa_3}
            nota_etapa_4={currentSubject.nota_etapa_4}
          />
        </CardPadding>
      </CardContainer>

      <CardContainer withProgressBar={true}>
        <CardPadding>
          <CardTitle>Carga Horária</CardTitle>
          <SubjectRegular>{currentSubject.carga_horaria_cumprida}h/{currentSubject.carga_horaria}h assistidas.</SubjectRegular>
        </CardPadding>
        <CardBar>
          <ProgressBar
            percentBar={(currentSubject.carga_horaria_cumprida / currentSubject.carga_horaria) * 100}
          />
        </CardBar>
      </CardContainer>

      <CardContainer withProgressBar={true}>
        <CardPadding>
          <CardTitle>Frequência</CardTitle>
          <SubjectRegular>
            {Math.floor(currentSubject.percentual_carga_horaria_frequentada)}% da carga horária frequentada.
          </SubjectRegular>
        </CardPadding>
        <CardBar>
          <ProgressBar
            percentBar={currentSubject.percentual_carga_horaria_frequentada}
          />
        </CardBar>
      </CardContainer>

      <GradeSquadContainerBottom>
        <GradeSquadBox>
          <GradeSquad>
            <GradeText>{currentSubject.media_disciplina || '-'}</GradeText>
          </GradeSquad>
          <GradeBottomSubject>MÉDIA</GradeBottomSubject>
        </GradeSquadBox>
        <GradeSquadBox>
          <GradeSquad>
            <GradeText>{currentSubject.media_final_disciplina || '-'}</GradeText>
          </GradeSquad>
          <GradeBottomSubject>MÉDIA{'\n'}FINAL</GradeBottomSubject>
        </GradeSquadBox>
        <GradeSquadBox>
          <GradeSquad>
            <GradeText>{currentSubject.nota_avaliacao_final.nota || '-'}</GradeText>
          </GradeSquad>
          <GradeBottomSubject>PROVA{'\n'}FINAL</GradeBottomSubject>
        </GradeSquadBox>
      </GradeSquadContainerBottom>

    </GradeSubjectContainer>
  )
}
