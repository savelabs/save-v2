import React from 'react';
import { ClienteSuap, InformaçõesTurmaVirtual } from 'suap-sdk-javascript';

import { useQuery } from 'react-query';
import { useAuth } from '../../../../hooks/auth';
import { Nothing } from '../Nothing';

import {
  ClassTitle,
  ClassDataContainer,
  ClassDataHeader,
  ClassDataText,
  ClassDataDescription,
  ClassTextDescription,
  ClassTextTeacher
} from './styles';

type ClassDataProps = {
  classID?: number;
}

export function ClassData({ classID }: ClassDataProps) {
  const { data } = useAuth();

  if (!classID) {
    return (
      <Nothing
        title="Aulas"
        description="Selecione uma matéria para continuar"
      />
    )
  }

  const clientStudent = new ClienteSuap({
    credenciais: data.credentials,
    usarApenasApi: true
  });

  const {
    data: classes,
    isError,
    isLoading,
    isFetching,
  } = useQuery<InformaçõesTurmaVirtual['aulas']>(['classes', classID], async () => {
    const studentClasses = (await clientStudent.obterDetalhesTurmaVirtual(String(classID))).aulas;
    return studentClasses;
  }, {
    enabled: !!classID,
  })

  if (isError) {
    return (
      <Nothing
        title="Aulas"
        description="Algum erro inesperado ocorreu"
      />
    )
  }
  if (isLoading || isFetching) {
    return <ClassDataText>Teste</ClassDataText>
  }

  return (
    <>
      <ClassTitle>Aulas</ClassTitle>

      {classes?.map(classData => {
        const date = classData.data.split('-')

        return (
          <ClassDataContainer key={`${classData.conteudo}.${classData.data}.${classData.etapa}.${classData.quantidade}`}>
            <ClassDataHeader>
              <ClassDataText isAlert={!!classData.faltas}>
                {`${date[2]}/${date[1]}/${date[0]}`}
              </ClassDataText>
              <ClassDataText isAlert={!!classData.faltas}>
                {`${classData.faltas
                  ? classData.faltas
                  : classData.quantidade
                  } ${classData.faltas
                    ? classData.faltas > 1 ? 'faltas' : 'falta'
                    : classData.quantidade > 1 ? 'aulas' : 'aula'
                  }`
                }
              </ClassDataText>
            </ClassDataHeader>
            <ClassDataDescription>
              <ClassTextDescription isAlert={!!classData.faltas}>
                {classData.conteudo}
              </ClassTextDescription>
              <ClassTextTeacher isAlert={!!classData.faltas}>
                {classData.professor}
              </ClassTextTeacher>
            </ClassDataDescription>
          </ClassDataContainer>
        )
      })}
    </>
  )
}
