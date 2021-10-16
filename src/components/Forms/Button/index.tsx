import React, { ReactNode } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  title?: string;
  children?: ReactNode;
  onPress?: () => void;
}

export function Button({ onPress, title, children, ...rest }: Props) {
  return (
    <Container onPress={onPress} {...rest}>
      {children ?
        (
          children
        ) : (
          <Title>
            {title}
          </Title>
        )
      }
    </Container>
  );
}
