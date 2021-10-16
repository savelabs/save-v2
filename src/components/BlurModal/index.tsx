import React, { ReactNode, useState } from 'react';

import { ModalContainer } from './styles';

import { BlurView } from 'expo-blur';
import { TouchableWithoutFeedback } from 'react-native';

type BlurModalProps = {
  children: ReactNode;
  visible: boolean;
}

export function BlurModal({ children, visible, ...rest }: BlurModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(visible);

  return (
    <ModalContainer
      transparent={true}
      {...rest}
    >
      {children}
      <TouchableWithoutFeedback onPress={() => setIsModalVisible(!isModalVisible)}>
        <BlurView style={{ flex: 1 }} intensity={50} tint="light" />
      </TouchableWithoutFeedback>
    </ModalContainer>
  );
}
