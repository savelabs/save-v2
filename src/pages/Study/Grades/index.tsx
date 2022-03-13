import React from 'react';

import { StudyPage } from '../components/StudyPage';

import {
  Container,
  ScrollContainer,
} from './styles';

export function Grades() {
  return (
    <ScrollContainer>
      <Container>
        <StudyPage page="grade" />
      </Container>
    </ScrollContainer>
  )
}
