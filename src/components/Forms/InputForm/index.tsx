import React from 'react';
import { TextInputProps } from 'react-native';

import { Control, Controller } from 'react-hook-form';

import { Input } from '../Input';

import { Container } from './styles';

interface Props extends TextInputProps {
  title: string;
  name: string;
  password?: boolean;
  passwordContext?: boolean;
  onPress?: () => void;
  control: Control;
  error: string;
  placeholder?: string;
}

export function InputForm({
  control,
  name,
  title,
  onPress,
  error,
  passwordContext = false,
  password = false,
  ...rest
}: Props) {
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Input
            title={title}
            error={error}
            onPress={onPress}
            onChangeText={onChange}
            value={value}
            password={password}
            passwordContext={passwordContext}
            {...rest}
          />
        )}
      />
    </Container>
  )
}
