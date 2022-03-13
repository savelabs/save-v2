import React from 'react';

import { StudyPage } from '../components/StudyPage';

import {
  Container,
  ScrollContainer,
} from './styles';

export function Classes() {
  return (
    <ScrollContainer>
      <Container>
        <StudyPage page="classes" />
      </Container>
    </ScrollContainer>
  )
}
