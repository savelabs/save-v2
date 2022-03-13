import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";


export const NothingTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${RFValue(16)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${RFValue(18)}px;
`

export const NothingSubtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-top: ${RFValue(4)}px;
  width: 60%;
`

export const NothingContainer = styled.View`
  align-items: center;
`

export const ImagePosition = styled.View`
  margin-top: ${RFValue(50)}px;
`
