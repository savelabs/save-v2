import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemeContext } from 'styled-components/native';

import { Container, LoadingContainer } from './styles'

export function LoadingSpinner() {
  const { colors } = useContext(ThemeContext);

  return (
    <Container>
      <LoadingContainer>
        <ActivityIndicator size="small" color={colors.primary} />
      </LoadingContainer>
    </Container>
  )
}
