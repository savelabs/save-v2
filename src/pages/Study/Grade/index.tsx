import React, { useEffect, useState } from 'react';
import { Boletim, ClienteSuap, Credenciais } from 'suap-sdk-javascript';
import { errorAlert } from '../../../utils/alert';

import { useQuery } from 'react-query';

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

type GradeProps = {
  period: string;
  credentials: Credenciais;
}

export function Grade({ period, credentials }: GradeProps) {

  const periodFormatted = period.split('.')

  const clientStudent = new ClienteSuap({
    credenciais: credentials,
    usarApenasApi: true
  });

  const { data: grades, isError, error, isLoading } = useQuery<Boletim[]>('grades', async () => {
    const studentGrades = await clientStudent.obterNotas(
      Number(periodFormatted[0]),
      Number(periodFormatted[1])
    );
    return studentGrades;
  })

  if (isError) {
    console.log(error)
    return <GradeTitle>Um erro ocorreu...</GradeTitle>
  }

  if (isLoading) {
    return <GradeTitle>Carregando...</GradeTitle>
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
            <GradeBox key={item.codigo_diario}>
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

