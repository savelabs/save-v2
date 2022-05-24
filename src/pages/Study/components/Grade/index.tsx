import React from 'react';
import { Boletim, ClienteSuap } from 'suap-sdk-javascript';

import { useQuery } from 'react-query';
import { useAuth } from '../../../../hooks/auth';
import { Nothing } from '../Nothing';

import {
  GradeTitle,
  TextDescription,
  GradeContainer,
  GradeHeader,
  ColumnTitle,
  SubjectPeriod,
  GradeBox,
  SubjectTitle,
  GradeValueContainer,
  GradeValue,
  GradeText,
} from './styles';
import { LoadingSpinner } from '../LoadingSpinner';

type GradeProps = {
  period: string;
}

export function Grade({ period }: GradeProps) {
  const { data, setClassKey } = useAuth();

  if (!period) {
    return (
      <Nothing
        title="Boletim Geral"
        description="Selecione um período letivo para continuar"
      />
    )
  }

  const periodFormatted = period.split('.')

  const clientStudent = new ClienteSuap({
    credenciais: data.credentials,
    usarApenasApi: true
  });

  const {
    data: grades,
    isError,
    isLoading,
    isFetching,
    refetch
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
        title="Boletim Geral"
        description="Algum erro inesperado ocorreu, tente sair e entrar novamente."
      />
    )
  }

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <GradeTitle>Boletim Geral</GradeTitle>
      <TextDescription>Toque para detalhar</TextDescription>

      <GradeContainer>
        <GradeHeader>
          <ColumnTitle>Matéria:</ColumnTitle>
          <SubjectPeriod>
            <TextDescription>1° BI</TextDescription>
            <TextDescription>2° BI</TextDescription>
            <TextDescription>3° BI</TextDescription>
            <TextDescription>4° BI</TextDescription>
          </SubjectPeriod>
        </GradeHeader>

        {grades?.map((item) => {
          const subjectNameArray = item.disciplina.toUpperCase().split('- ')
          const subjectName = subjectNameArray[1];

          const gradeOne = item.segundo_semestre
            ? null
            : item.nota_etapa_1.nota;
          const gradeTwo = item.segundo_semestre
            ? null
            : item.nota_etapa_2.nota;
          const gradeThree = item.segundo_semestre
            ? item.nota_etapa_1.nota
            : item.nota_etapa_3.nota;
          const gradeFour = item.segundo_semestre
            ? item.nota_etapa_2.nota
            : item.nota_etapa_4.nota;

          return (
            <GradeBox onPress={() => setClassKey({ id: Number(item.codigo_diario), description: subjectName })} key={item.codigo_diario}>
              <SubjectTitle>
                {subjectName}
              </SubjectTitle>
              <GradeValueContainer>
                <GradeValue>
                  <GradeText>{gradeOne || '-'}</GradeText>
                </GradeValue>
                <GradeValue>
                  <GradeText>{gradeTwo || '-'}</GradeText>
                </GradeValue>
                <GradeValue>
                  <GradeText>{gradeThree || '-'}</GradeText>
                </GradeValue>
                <GradeValue>
                  <GradeText>{gradeFour || '-'}</GradeText>
                </GradeValue>
              </GradeValueContainer>
            </GradeBox>
          );
        })}
      </GradeContainer>
    </>
  )
}

