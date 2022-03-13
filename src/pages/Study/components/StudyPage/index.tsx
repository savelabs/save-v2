import React, { useContext, useEffect, useState } from 'react';

import { useQuery } from 'react-query';

import { Feather } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';

import { useAuth } from '../../../../hooks/auth';
import { ClienteSuap, PeríodoLetivo, TurmaVirtual } from 'suap-sdk-javascript';
import { RFValue } from 'react-native-responsive-fontsize';

import { Grade } from '../Grade';
import { Material } from '../Material';
import { ClassData } from '../ClassData';
import { GradeSubject } from '../GradeSubject';
import { Info } from '../Info';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import {
  PeriodContainer,
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

  ModalOverlayContainer,
  ModalContainer,
  ModalBox,
  ModalTitle,
  ModalHeader,
  ModalScroll,
  ClassButton,
  ClassText,

  ReturnContainer,
  ReturnText,
} from './styles'

type Pages = "grade" | "materials" | "classes" | "information"
type NavigationProps = "Grades" | "Materials" | "Classes" | "Infos"

type HeaderProps = {
  page: Pages,
}

type SelectedClassProps = {
  id?: number,
  description?: string
}

export function StudyPage({ page }: HeaderProps) {
  const { colors } = useContext(ThemeContext);
  const { navigate } = useNavigation();

  const { setPeriodKey, classKey, setClassKey, periodKey, data } = useAuth();
  const [selectedPeriodKey, setSelectedPeriodKey] = useState('');

  const [selectedClass, setSelectedClass] = useState<SelectedClassProps>({})
  const [isModalVisible, setModalVisible] = useState(false);

  const clientStudent = new ClienteSuap({ credenciais: data.credentials, usarApenasApi: true });

  useFocusEffect(() => {
    if (periodKey) {
      setSelectedPeriodKey(periodKey)
    }
    if (classKey) {
      setSelectedClass(classKey)
    }
  })

  function handleRemoveClass() {
    setSelectedClass({});
    setClassKey({})
  }

  function handleSelectPeriod(period: string) {
    setSelectedClass({});
    setClassKey({})
    setSelectedPeriodKey(period);
    setPeriodKey(period)
  }

  function handleSelectClass(classProps: SelectedClassProps) {
    setModalVisible(false);
    setSelectedClass(classProps);
    setClassKey(classProps)
  }

  const {
    data: periods,
    isError: isErrorPeriod,
    isLoading: isLoadingPeriod,
    isFetching: isFetchingPeriod,
  } = useQuery<PeríodoLetivo[]>('periods', async () => {
    const studentPeriods = await clientStudent.obterPeríodosLetivos();
    const studentPeriodsFormatted = studentPeriods.reverse();
    return studentPeriodsFormatted;
  })

  const {
    data: classes,
    isError: isErrorClasses,
    isFetching: isFetchingClasses,
    refetch: refetchClasses
  } = useQuery<TurmaVirtual[] | undefined>(['classes', selectedPeriodKey], async () => {
    const periodFormatted = selectedPeriodKey.split('.')
    const studentClasses = await clientStudent.obterTurmasVirtuais(
      Number(periodFormatted[0]),
      Number(periodFormatted[1])
    );

    return studentClasses;
  }, {
    enabled: !!selectedPeriodKey,
  })

  if (isErrorPeriod) {
    return <PickerTitle>Algum erro ocorreu</PickerTitle>;
  }

  if (isLoadingPeriod || isFetchingPeriod) {
    return <PickerTitle>Carregando</PickerTitle>;
  }

  function handleNavigate(navigatePage: NavigationProps) {
    if (!selectedPeriodKey) {
      return;
    }
    navigate(navigatePage);
  }

  return (
    <>
      <Modal
        animationType="fade"
        visible={isModalVisible}
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <ModalOverlayContainer />
        </TouchableWithoutFeedback>

        <ModalContainer>
          <ModalBox>
            <ModalHeader>
              <ModalTitle>Selecione uma matéria</ModalTitle>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Feather name="x" size={RFValue(24)} color={colors.text} />
              </TouchableOpacity>
            </ModalHeader>

            <ModalScroll
              data={classes}
              renderItem={({ item }) => (
                <ClassButton onPress={() => handleSelectClass({
                  id: item.id,
                  description: item.descricao
                })}>
                  <ClassText>{item.descricao}</ClassText>
                </ClassButton>
              )}
              keyExtractor={(item) => String(item.id)}
            />
          </ModalBox>
        </ModalContainer>
      </Modal>

      {page === 'grade' && selectedClass.id ? (
        <ReturnContainer onPress={() => handleRemoveClass()}>
          <Feather name="chevron-left" size={RFValue(24)} color={colors.primary_dark} />
          <ReturnText>Boletim Geral</ReturnText>
        </ReturnContainer>
      ) : (
        <PeriodContainer>
          <PeriodScroll
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            data={periods}
            renderItem={({ item, index }) => (
              selectedPeriodKey === `${item.ano_letivo}.${item.periodo_letivo}` ? (
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
      )
      }

      <PickerTitle>Matéria</PickerTitle>
      <PickerContainer
        onPress={() => setModalVisible(true)}
        disabled={
          !selectedPeriodKey || isFetchingClasses
            ?
            true
            :
            false
        }
      >
        <Picker>
          <PickerPlaceholder isSelected={selectedClass.id ? true : false}>
            {selectedPeriodKey
              ? isFetchingClasses
                ? 'Carregando matérias...'
                : selectedClass.description || 'Toque e escolha uma matéria'
              : 'Selecione um período letivo'
            }
          </PickerPlaceholder>
          <Feather name="plus-circle" size={RFValue(24)} color={colors.border} />
        </Picker>
      </PickerContainer>
      <NavbarContainer>
        <NavbarButton onPress={() => handleNavigate('Grades')}>
          <NavbarGradient>
            <Feather
              name="file-text"
              size={RFValue(24)}
              color={page === 'grade' ? colors.alert : colors.primary_dark}
            />
          </NavbarGradient>
        </NavbarButton>
        <NavbarButton onPress={() => handleNavigate('Materials')}>
          <NavbarGradient>
            <Feather
              name="paperclip"
              size={RFValue(24)}
              color={page === 'materials' ? colors.alert : colors.primary_dark}
            />
          </NavbarGradient>
        </NavbarButton>
        <NavbarButton onPress={() => handleNavigate('Classes')}>
          <NavbarGradient>
            <Feather
              name="edit-3"
              size={RFValue(24)}
              color={page === 'classes' ? colors.alert : colors.primary_dark}
            />
          </NavbarGradient>
        </NavbarButton>
        <NavbarButton onPress={() => handleNavigate('Infos')}>
          <NavbarGradient>
            <Feather
              name="info"
              size={RFValue(24)}
              color={page === 'information' ? colors.alert : colors.primary_dark}
            />
          </NavbarGradient>
        </NavbarButton>
      </NavbarContainer>
      {
        page === 'grade' ? (
          selectedClass.id
            ? <GradeSubject period={selectedPeriodKey} classID={selectedClass.id} />
            : <Grade period={selectedPeriodKey} />
        ) : (
          page === 'materials' ? (
            <Material classID={selectedClass.id || undefined} />
          ) : (
            page === 'classes' ? (
              <ClassData classID={selectedClass.id} />
            ) : (
              <Info classID={selectedClass.id} />
            )
          )
        )
      }
    </>
  )
}
