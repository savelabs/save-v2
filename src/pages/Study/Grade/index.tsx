import React, { useEffect, useState } from 'react';
import { Boletim, ClienteSuap, Credenciais } from 'suap-sdk-javascript';
import { errorAlert } from '../../../utils/alert';

import {
  GradeTitle,
  TextDescription,
  GradeContainer,
  GradeHeader,
  ColumnTitle,
  SubjectPeriod,
  GradeList,
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
  const [grades, setGrades] = useState<Boletim[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function handleGetGrades() {
      try {
        setLoading(true);
        const periodFormatted = period.split('.')

        const clientStudent = new ClienteSuap({
          credenciais: credentials,
          usarApenasApi: true
        });

        const studentGrades = await clientStudent.obterNotas(
          Number(periodFormatted[0]),
          Number(periodFormatted[1])
        );

        setGrades(studentGrades);
        console.log(studentGrades);

        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        if (err.response.status === 404) {
          console.log('teste');
          return setGrades(undefined);
        }
        return errorAlert(err.response.data.detail, 'Algum erro ocorreu.')
      }
    }
    handleGetGrades()
  }, [period, credentials])

  if (loading) {
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

        <GradeList
          data={grades}
          renderItem={({ item }) => {
            const subjectNameArray = item.disciplina.toUpperCase().split('- ')
            const subjectName = subjectNameArray[1];

            const gradeOne = item.nota_etapa_1.nota;
            const gradeTwo = item.nota_etapa_2.nota;
            const gradeThree = item.nota_etapa_3.nota;
            const gradeFour = item.nota_etapa_4.nota;

            return (
              <GradeBox>
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
            )
          }}
          keyExtractor={(item) => item.disciplina}
        />

      </GradeContainer>
    </>
  )
}
