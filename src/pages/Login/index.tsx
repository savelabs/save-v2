import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, Linking, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useForm } from 'react-hook-form';

import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Illustration from '../../assets/login-image.svg';
import { Button } from '../../components/Forms/Button';
import { InputForm } from '../../components/Forms/InputForm';

import { SignInCredentials, useAuth } from '../../hooks/auth';
import { ThemeContext } from 'styled-components/native';
import { gql, useMutation } from '@apollo/client';
import { errorAlert } from '../../utils/alert';

import {
  Container,
  IllustrationContainer,
  FormContainer,
  Title,
  Fields,
  Policy,
} from './styles';


interface FormData {
  matricula: string;
  password: string;
}

const schema = Yup.object().shape({
  matricula: Yup.string().required('A matríula é obrigatória'),
  password: Yup.string().required('A senha é obrigatória'),
});

export function Login() {
  const animation = useSharedValue(0);
  const { signIn } = useAuth();

  const { colors } = useContext(ThemeContext)
  const [loading, setLoading] = useState(false);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(animation.value)
        }
      ]
    }
  });

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  });

  const keyboardDidShow = () => {
    setIsKeyboardActive(true)
    animation.value = 10;
  };
  const keyboardDidHide = () => {
    setIsKeyboardActive(false)
    animation.value = 0;
  };

  const LOGIN_USER = gql`
    mutation Login($matriculation: String!, $password: String!) {
      login(data: {
        matriculation: $matriculation
        password: $password
      }) {
        user {
          id,
          photoHref
        },
        token,
        refreshToken,
        apiToken,
        cookies
      }
    }
  `;

  const [mutateFunction] = useMutation(LOGIN_USER);

  async function onSubmit(formData: any) {
    try {
      setLoading(true);
      const signInSave = await mutateFunction({
        variables: {
          matriculation: formData.matricula,
          password: formData.password
        }
      })

      await signIn(formData as FormData, signInSave.data.login as SignInCredentials);
      setLoading(false);
      reset()
    } catch (err: any) {
      setLoading(false);
      reset()
      return errorAlert(err.message, 'Certifique de que as informações estão corretas.')
    }
  }

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", keyboardDidHide);
  }, [isKeyboardActive]);

  return (
    <>
      <Container>
        <IllustrationContainer>
          <Illustration
            width={RFValue(224)}
            height={RFValue(232)}
            style={{ bottom: RFValue(-22) }}
          />
        </IllustrationContainer>
        <FormContainer
          style={[isKeyboardActive && { position: 'absolute', bottom: 0, zIndex: 2, height: RFValue(408) },
            animatedStyles]}
        >
          <Title>Hey,{'\n'}vamos lá?</Title>
          <Fields>
            <InputForm
              name="matricula"
              title="Matrícula"
              control={control}
              placeholder="Digite sua matrícula"
              autoCorrect={false}
              keyboardType="numeric"
              error={errors.matricula && errors.matricula.message}
            />
            <InputForm
              name="password"
              title="Senha"
              control={control}
              placeholder="Digite sua senha"
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={isPasswordHidden}
              password
              onPress={() => setIsPasswordHidden(!isPasswordHidden)}
              passwordContext={!isPasswordHidden}
              error={errors.password && errors.password.message}
            />
          </Fields>
          {
            loading ? (
              <Button
                enabled={false}
              >
                <ActivityIndicator size="large" color={colors.background} />
              </Button>
            ) : (
              <Button enabled={true} onPress={() => handleSubmit(onSubmit)()}>Entrar</Button>
            )
          }
          <TouchableOpacity onPress={() => Linking.openURL('https://save-page.vercel.app/privacy')}>
            <Policy>Política de Privacidade</Policy>
          </TouchableOpacity>
        </FormContainer>
      </Container>
    </>
  );
}
