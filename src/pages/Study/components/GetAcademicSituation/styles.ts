import { RFValue } from "react-native-responsive-fontsize"
import styled from "styled-components/native"

export const SubjectRegular = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(11)}px;
  color: ${({ theme }) => theme.colors.text};
`


export const SubjectMedium = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: ${RFValue(11)}px;
  color: ${({ theme }) => theme.colors.text};
`
