import React, { useContext } from 'react';
import { ClienteSuap, InformaçõesTurmaVirtual } from 'suap-sdk-javascript';

import { useQuery } from 'react-query';
import { useAuth } from '../../../../hooks/auth';

import { Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { Nothing } from '../Nothing';
import { LoadingSpinner } from '../LoadingSpinner';

import {
  MaterialTitle,
  MaterialContainer,
  MaterialDescription,
  MaterialDate,
  MaterialDownload,
  MaterialGradient,
} from './styles';

type MaterialProps = {
  classID?: number;
}

export function Material({ classID }: MaterialProps) {
  const { data } = useAuth();
  const { colors } = useContext(ThemeContext);

  if (!classID) {
    return (
      <Nothing
        title="Materiais de Aula"
        description="Selecione uma matéria para continuar"
      />
    )
  }

  const clientStudent = new ClienteSuap({
    credenciais: data.credentials,
    usarApenasApi: true
  });

  const {
    data: materials,
    isError,
    isLoading,
    isFetching,
  } = useQuery<InformaçõesTurmaVirtual['materiais_de_aula']>(['materials', classID], async () => {
    const studentMaterials = (await clientStudent.obterDetalhesTurmaVirtual(String(classID))).materiais_de_aula;
    return studentMaterials;
  }, {
    enabled: !!classID,
  })

  if (isError) {
    return (
      <Nothing
        title="Materiais de Aula"
        description="Algum erro inesperado ocorreu"
      />
    )
  }

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  function handleDownloadFile(url: string) {
    Linking.openURL(`https://suap.ifrn.edu.br/${url}`)
  }

  if (materials?.length === 0) {
    return (
      <Nothing
        title="Materiais de Aula"
        description="Nenhum material encontrado"
      />
    )
  }

  return (
    <>
      <MaterialTitle>Materiais de Aula</MaterialTitle>
      {materials?.map((material) => {
        const date = material.data_vinculacao.split('-')

        return (
          <MaterialContainer key={material.url}>
            <MaterialDescription>
              {material.descricao}
              {'\n'}
              <MaterialDate>Postado no dia: {`${date[2]}/${date[1]}/${date[0]}`}</MaterialDate>
            </MaterialDescription>

            <MaterialDownload onPress={() => handleDownloadFile(material.url)}>
              <MaterialGradient>
                <Feather name="download" size={RFValue(24)} color={colors.primary_dark} />
              </MaterialGradient>
            </MaterialDownload>
          </MaterialContainer>
        )
      })}
    </>
  )
}

