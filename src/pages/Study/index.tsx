import React, { useContext, useEffect, useState } from 'react';
import { ClienteSuap, PeríodoLetivo, Boletim } from 'suap-sdk-javascript';
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

export function Study() {
  const { data, renew, setPeriodKey, periodKey } = useAuth();

  const [periodSelected, setPeriodSelected] = useState('');
  const [loading, setLoading] = useState(true);
  const [periods, setPeriods] = useState<PeríodoLetivo[]>();


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
          <NavbarButton>
            <NavbarGradient>
              <Feather name="file-text" size={RFValue(24)} color={colors.primary_dark} />
            </NavbarGradient>
          </NavbarButton>
          <NavbarButton>
            <NavbarGradient>
              <Feather name="paperclip" size={RFValue(24)} color={colors.primary_dark} />
            </NavbarGradient>
          </NavbarButton>
          <NavbarButton>
            <NavbarGradient>
              <Feather name="edit-3" size={RFValue(24)} color={colors.primary_dark} />
            </NavbarGradient>
          </NavbarButton>
          <NavbarButton>
            <NavbarGradient>
              <Feather name="info" size={RFValue(24)} color={colors.primary_dark} />
            </NavbarGradient>
          </NavbarButton>
        </NavbarContainer>
        <Grade period={periodSelected} credentials={data.credentials}></Grade>

      </Container>
    </ScrollContainer>
  )
}
