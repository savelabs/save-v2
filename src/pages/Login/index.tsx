import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useForm } from 'react-hook-form';

import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Illustration from '../../assets/login-image.svg';
import { Button } from '../../components/Forms/Button';
import { InputForm } from '../../components/Forms/InputForm';

import {
  Container,
  IllustrationContainer,
  FormContainer,
  Title,
  Fields,
  Policy,
} from './styles';
import { useAuth } from '../../hooks/auth';
import { ThemeContext } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

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
  const { navigate } = useNavigation()
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

  async function onSubmit(data: any) {
    try {
      setLoading(true);
      await signIn(data as FormData);
      setLoading(false);
      reset()
    } catch (err: any) {
      setLoading(false);
      reset()
    }
  }

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", keyboardDidHide);
    };
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
          <TouchableOpacity>
            <Policy>Política de Privacidade</Policy>
          </TouchableOpacity>
        </FormContainer>
      </Container>
    </>
  );
}
