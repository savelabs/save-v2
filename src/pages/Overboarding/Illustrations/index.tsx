import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, View, } from 'react-native';

import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import Overboarding1 from '../../../assets/overboarding1.svg';
import Overboarding2 from '../../../assets/overboarding2.svg';
import Overboarding3 from '../../../assets/overboarding3.svg';
import { useAuth } from '../../../hooks/auth';

import {
  Container,
  OverBox,
  IllustrationContainer,
  Footer,
  Circle,
  BigCircle,
  Description,
  StatusCircle,
  Button,
  ButtonText
} from './styles'

type IllustrationsProps = {
  translateX: Animated.SharedValue<number>
  index: number;
  title: string;
}

export function Illustrations({ translateX, index, title }: IllustrationsProps) {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const inputRange = [(index - 2) * width, index * width, (index + 2) * width];

  const { removeFirstTime } = useAuth();
  const navigation = useNavigation();


  async function handleNavigateToLogin() {
    await removeFirstTime();
    navigation.navigate('Login')
  }

  const circleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-4, 1, -4],
      Extrapolate.CLAMP
    )

    const translateY = interpolate(
      translateX.value,
      inputRange,
      [-height / 2, 0, height / 2],
      Extrapolate.CLAMP
    )

    return {
      opacity,
      transform: [{ translateY }]
    }
  })

  const textStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-3, 1, -3],
    )

    return { opacity }
  })

  const squadStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [2.2, 1, 2.2],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }]
    }
  })

  return (
    <Container>
      <OverBox>
        <IllustrationContainer style={squadStyle}>
          {index === 0 ? (
            <Overboarding1 />
          ) : index === 1 ? (
            <Overboarding2 />
          ) : index === 2 ? (
            <Overboarding3 />
          ) : null}
        </IllustrationContainer>
      </OverBox>
      <Footer>
        <StatusCircle style={circleStyle}>
          {index === 0 ? <BigCircle /> : <Circle />}
          {index === 1 ? <BigCircle /> : <Circle />}
          {index === 2 ? <BigCircle /> : <Circle />}
        </StatusCircle>
        <Description style={textStyle}>
          {title}
        </Description>
        {index === 2 && (
          <Button onPress={handleNavigateToLogin}>
            <ButtonText>Começar</ButtonText>
          </Button>)}
      </Footer>
    </Container>
  )
}
