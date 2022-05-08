import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import { ThemeContext } from 'styled-components';
import { ProfileHeader } from '../components/ProfileHeader';

import * as ImagePicker from 'expo-image-picker';
import { ReactNativeFile } from 'apollo-upload-client';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from '../../../hooks/auth';
import { warningAlert, errorAlert } from '../../../utils/alert';

import * as FileSystem from 'expo-file-system';

import {
  Container,
  HeaderContainer,
  ReturnContainer,
  ReturnText,

  ButtonContainer,
  UploadButton,
  UploadText
} from './styles';


export function ProfileEdit() {
  const { goBack } = useNavigation();
  const { colors } = useContext(ThemeContext);
  const { saveCredentials, renewSaveCredentials } = useAuth();

  const FILE_UPLOAD = gql`
    mutation Upload($file: String!, $extension: String!) {
      uploadPhoto(file: $file, extension: $extension)
    }
  `;

  const REFRESH_TOKEN = gql`
    mutation Refresh($token: String!, $refreshToken: String!) {
      refreshToken(
        token: $token,
        refreshToken: $refreshToken
      )
    }
  `

  const [refreshMutation] = useMutation(REFRESH_TOKEN);

  const [mutateFunction, { data, loading, error }] = useMutation(FILE_UPLOAD, {
    onError: (errs) => { console.log(errs.message) },

  });

  async function handleChangePhoto() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    const image = result as ImagePicker.ImageInfo

    const file = new ReactNativeFile({
      uri: image.uri,
      type: image.type,
    });

    const response = await refreshMutation({
      variables: {
        token: saveCredentials?.token,
        refreshToken: saveCredentials?.refreshToken
      }
    });

    const token = response.data.refreshToken;

    const extension = file.uri.split('.').pop();
    const fileBase64 = await FileSystem.readAsStringAsync(file.uri, { encoding: 'base64' });

    try {
      const teste = await mutateFunction({
        variables: {
          file: fileBase64,
          extension
        },
        context: {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      })

      console.log(teste)

      renewSaveCredentials()

      return warningAlert('Foto enviada', 'Sua foto foi enviada com sucesso, aguarde um momento para atualizar');
    } catch (err) {
      console.log(err)
      return errorAlert('Ocorreu um erro', 'Não foi possível alterar sua foto');
    }
  }

  return (
    <Container>
      <ReturnContainer onPress={() => goBack()}>
        <Feather name="chevron-left" size={RFValue(24)} color={colors.primary_dark} />
        <ReturnText>Perfil</ReturnText>
      </ReturnContainer>

      <HeaderContainer>
        <ProfileHeader editMode />
      </HeaderContainer>

      <ButtonContainer>
        <TouchableOpacity onPress={() => handleChangePhoto()} >
          <UploadButton>
            <UploadText>ALTERAR FOTO DE PERFIL</UploadText>
            <Feather name="upload" size={RFValue(24)} color={colors.primary_dark} />
          </UploadButton>
        </TouchableOpacity>
      </ButtonContainer>
    </Container >
  )
}
