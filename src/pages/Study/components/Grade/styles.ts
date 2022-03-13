import {  RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { ShapeGradient } from "../../../../components/ShapeGradient";

export const GradeTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${RFValue(16)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${RFValue(18)}px;
`

export const TextDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(10)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`

export const GradeContainer = styled.View`
  width: 100%;
  margin-top: ${RFValue(18)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 24px;
  padding-bottom: ${RFValue(18)}px;
  elevation: 2;
`
export const GradeHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
`
export const ColumnTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
`
export const SubjectPeriod = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 50%;
`

export const GradeBox = styled(RectButton)`
  width: 100%;
  padding: ${RFValue(8)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${RFValue(8)}px;
  background-color: ${({ theme }) => theme.colors.background};
`

export const SubjectTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(9)}px;
  color: ${({ theme }) => theme.colors.text};
  max-width: 44%;
`

export const GradeValueContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 52%;
`

export const GradeValue = styled(ShapeGradient)`
  width: ${RFValue(30)}px;
  height: ${RFValue(30)}px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`

export const GradeText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.primary_dark};
`
