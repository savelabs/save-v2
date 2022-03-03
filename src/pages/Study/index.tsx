import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Boletim, ClienteSuap, PeríodoLetivo } from 'suap-sdk-javascript';
import { useAuth } from '../../hooks/auth';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import {
  PeriodContainer,
  Container,
  PeriodScroll,
  PeriodButton,
  PeriodText,
  PeriodButtonSelected,
  Picker,
  PickerTitle,
  PickerContainer,
  PickerPlaceholder,
  NavbarGradient,
  NavbarContainer,
  NavbarButton,
  ScrollContainer,
} from './styles';

import { Grade } from './Grade';

type Pages = "grade" | "materials" | "classes" | "information"

export function Study() {
  const { data, renew, setPeriodKey, periodKey } = useAuth();
  const [periodSelected, setPeriodSelected] = useState('');

  const [loading, setLoading] = useState(true);
  const [periods, setPeriods] = useState<PeríodoLetivo[]>();

  const [page, setPage] = useState<Pages>('grade');

  const { colors } = useContext(ThemeContext);

  async function handleSelectPeriod(period: string) {
    setPeriodSelected(period)
    setPeriodKey(period)
  }

  useEffect(() => {
    async function getPeriods() {
      setLoading(true)
      try {
        const clientStudent = new ClienteSuap({ credenciais: data.credentials, usarApenasApi: true });
        const studentPeriods = await clientStudent.obterPeríodosLetivos();

        setPeriods(studentPeriods.reverse());

        if (periodKey) {
          setPeriodSelected(periodKey);
        }

        setLoading(false);
      } catch {
        await renew();
        setLoading(false);
      }
    }

    getPeriods()
  }, []);

  const handleGetPage = useMemo(() => {
    if (!page) {
      return null;
    }

    if (page === 'grade') {
      return <Grade period={periodSelected} credentials={data.credentials} />
    }

    return <Feather
      name="info"
      size={RFValue(24)}
      color={page === 'information' ? colors.alert : colors.primary_dark}
    />
  }, [page, data, periodSelected])

  if (loading) {
    return <PeriodText>Carregando.....</PeriodText>
  }

  return (
    <ScrollContainer>
      <Container>
        <PeriodContainer>
          <PeriodScroll
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            data={periods}
            renderItem={({ item, index }) => (
              periodSelected === `${item.ano_letivo}.${item.periodo_letivo}` ? (
                <PeriodButtonSelected
                  isFirstElement={index === 0 ? true : false}>
                  <PeriodText>{item.ano_letivo}.{item.periodo_letivo}</PeriodText>
                </PeriodButtonSelected>
              ) : (
                <PeriodButton
                  onPress={() => handleSelectPeriod(`${item.ano_letivo}.${item.periodo_letivo}`)}
                  isFirstElement={index === 0 ? true : false}>
                  <PeriodText>{item.ano_letivo}.{item.periodo_letivo}</PeriodText>
                </PeriodButton>
              )
            )}
            keyExtractor={(period) => `${period.ano_letivo}.${period.periodo_letivo}`}
          >
          </PeriodScroll>
        </PeriodContainer>
        <PickerTitle>Matéria</PickerTitle>
        <PickerContainer>
          <Picker>
            <PickerPlaceholder>
              Toque e escolha uma matéria
            </PickerPlaceholder>
            <Feather name="plus-circle" size={RFValue(24)} color={colors.border} />
          </Picker>
        </PickerContainer>
        <NavbarContainer>
          <NavbarButton onPress={() => setPage('grade')}>
            <NavbarGradient>
              <Feather
                name="file-text"
                size={RFValue(24)}
                color={page === 'grade' ? colors.alert : colors.primary_dark}
              />
            </NavbarGradient>
          </NavbarButton>
          <NavbarButton onPress={() => setPage('materials')}>
            <NavbarGradient>
              <Feather
                name="paperclip"
                size={RFValue(24)}
                color={page === 'materials' ? colors.alert : colors.primary_dark}
              />
            </NavbarGradient>
          </NavbarButton>
          <NavbarButton onPress={() => setPage('classes')}>
            <NavbarGradient>
              <Feather
                name="edit-3"
                size={RFValue(24)}
                color={page === 'classes' ? colors.alert : colors.primary_dark}
              />
            </NavbarGradient>
          </NavbarButton>
          <NavbarButton onPress={() => setPage('information')}>
            <NavbarGradient>
              <Feather
                name="info"
                size={RFValue(24)}
                color={page === 'information' ? colors.alert : colors.primary_dark}
              />
            </NavbarGradient>
          </NavbarButton>
        </NavbarContainer>

        {handleGetPage}

      </Container>
    </ScrollContainer>
  )
}
