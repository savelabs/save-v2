import React from 'react';

import { StudyPage } from '../components/StudyPage';

import {
  Container,
  ScrollContainer,
} from './styles';

export function Materials() {
  return (
    <ScrollContainer>
      <Container>
        <StudyPage page="materials" />
      </Container>
    </ScrollContainer>
  )
}
