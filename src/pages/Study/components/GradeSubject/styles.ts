import styled, { css } from "styled-components/native"
import { RFValue } from "react-native-responsive-fontsize";
import { ShapeGradient } from "../../../../components/ShapeGradient";
import { RectButton } from "react-native-gesture-handler";

type CardProps = {
  withProgressBar?: boolean;
}

type ProgressBarProps = {
  percentBar: number;
}

export const GradeSubjectContainer = styled.View`
  width: 100%;
  border-radius: ${RFValue(24)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  padding: ${RFValue(12)}px;
  margin-top: ${RFValue(18)}px;

  elevation: 3;
`

export const SubjectTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};

  text-align: center;
`

export const SubjectRegular = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(11)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const GradeSquadContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${RFValue(12)}px;
`

export const GradeSquadBox = styled.View`
  align-items: center;
  text-align: center;
`

export const GradeSquad = styled(ShapeGradient)`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 16px;
  background-color:  ${({ theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
  margin-bottom: ${RFValue(4)}px;

  elevation: 3;
`

export const GradeText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${RFValue(22)}px;
  color: ${({ theme }) => theme.colors.primary_dark};
`

export const CardContainer = styled.View<CardProps>`
  width: 100%;
  border-radius: ${RFValue(24)}px;
  background-color: ${({ theme }) => theme.colors.shape};

  margin-top: ${RFValue(18)}px;
  elevation: 3;

  ${(props) => props.withProgressBar && (
    css`
      border-bottom-left-radius: ${RFValue(8)}px;
      border-bottom-right-radius: ${RFValue(8)}px;
      border-top-right-radius: ${RFValue(24)}px;
      border-top-left-radius: ${RFValue(24)}px;
    `
  )}
`

export const DetailsHeader = styled.View`
  width: 100%;
  padding: ${RFValue(18)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const DetailsButton = styled(RectButton)`
  width: 100%;
  border-radius: 28px;
`

export const DetailsButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.border};

  text-align: center;
`

export const CardTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const CardPadding = styled.View`
  padding: ${RFValue(18)}px;
`

export const CardBar = styled.View`
  width: 100%;
  height: ${RFValue(10)}px;
  border-radius: 28px;

  background-color: ${({ theme }) => theme.colors.gradient1};
  position: absolute;
  bottom: 0;

  justify-content: center;
`

export const ProgressBar = styled.View<ProgressBarProps>`
  height: ${RFValue(10)}px;
  border-radius: 28px;

  background-color: ${({ theme }) => theme.colors.primary};

  width: ${(props) => props.percentBar}%;
`

export const GradeSquadContainerBottom = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-top: ${RFValue(18)}px;
  padding: ${RFValue(18)}px;
`

export const GradeBottomSubject = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`
