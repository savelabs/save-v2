import React, { ReactNode } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  children?: ReactNode;
}

export function Button({ children, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Title>
        {children}
      </Title>
    </Container>
  );
}
