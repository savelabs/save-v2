import React, { useContext, useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

import {
  BorderContainer,
  Container,
  Title,
  InputContainer,
  PasswordButton,
} from './styles';

import { BorderlessButton } from 'react-native-gesture-handler';
import { ThemeContext } from 'styled-components';

interface Props extends TextInputProps {
  title: string;
  textBox?: boolean;
  password: boolean;
  passwordContext: boolean;
  onPress?: () => void;
  error: string;
}

export function Input(
  {
    title,
    password,
    passwordContext,
    onPress,
    error,
    textBox,
    ...rest
  }: Props) {

  const { colors } = useContext(ThemeContext)
  const { placeholder } = rest;

  return (
    <InputContainer>
      <Title>
        {`${title}`}
      </Title>
      <BorderContainer textBox={textBox}>
        <Container
          password={password}
          placeholderTextColor={error ? colors.alert : colors.border}
          {...rest}
          placeholder={error ? error : placeholder}
          border={error ? colors.alert : colors.border}
        />
        {password && (
          <PasswordButton border={error ? colors.alert : colors.border}>
            <BorderlessButton onPress={onPress}>
              {passwordContext ? (
                <Feather name="eye-off" size={24} color={colors.primary} />
              ) : (
                <Feather name="eye" size={24} color={colors.primary} />
              )}
            </BorderlessButton>
          </PasswordButton>
        )}
      </BorderContainer>
    </InputContainer>
  );
}
