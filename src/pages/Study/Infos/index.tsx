import React from 'react';

import { StudyPage } from '../components/StudyPage';

import {
  Container,
  ScrollContainer,
} from './styles';

export function Infos() {
  return (
    <ScrollContainer>
      <Container>
        <StudyPage page="information" />
      </Container>
    </ScrollContainer>
  )
}
