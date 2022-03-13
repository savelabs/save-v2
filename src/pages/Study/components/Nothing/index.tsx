import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';

import NothingHereDark from '../../../../assets/nothing-here-dark.svg'
import NothingHereLight from '../../../../assets/nothing-here-light.svg'

type NothingProps = {
  title: string,
  description: string
}

import {
  NothingTitle,
  NothingSubtitle,
  NothingContainer,
  ImagePosition
} from './styles';

export function Nothing({ title, description }: NothingProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <NothingContainer>
      <NothingTitle>{title}</NothingTitle>
      <NothingSubtitle>{description}</NothingSubtitle>

      <ImagePosition>
        {theme === 'light' ? <NothingHereLight /> : <NothingHereDark />}
      </ImagePosition>
    </NothingContainer>
  )
}
