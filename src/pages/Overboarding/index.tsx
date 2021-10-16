import React, { useRef } from 'react';
import { StatusBar } from 'react-native';
import { Dimensions } from 'react-native';
import { ScrollView as ScrollViewType } from 'react-native-gesture-handler';

import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { Illustrations } from './Illustrations';

import {
  Container,
  Content,
  Header,
  Welcome,
  Save,
  ScrollView,
} from './styles';

export function Overboarding() {
  const translateX = useSharedValue(0);
  const scrollRef = useRef<ScrollViewType | undefined>()

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  })

  const images = [
    'Tenha o SUAP simples e descomplicado em suas mãos.',
    'Acessar os materiais de aula nunca foi tão fácil.',
    'Seja notificado quando receber uma falta ou uma nota.',
  ]

  const width = Dimensions.get('window').width;

  function handleChangePage() {
    scrollRef.current?.scrollTo({ x: translateX.value + width });
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#69349E" />
      <Content>
        <Header>
          <Welcome>Bem-vindo ao</Welcome>
          <Save>save</Save>
        </Header>
        <ScrollView
          ref={scrollRef as any}
          onScroll={scrollHandler}
          onTouchEnd={handleChangePage}
          scrollEventThrottle={16}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          {images.map((msg, index) => {
            return (
              <Illustrations title={msg} key={index} index={index} translateX={translateX} />
            );
          })}
        </ScrollView>
      </Content>
    </Container>
  );
}
