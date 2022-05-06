import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const LoadingContainer = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
  justify-content: center;
`

export const Container = styled.ScrollView`
  flex: 1;
  padding: ${RFValue(28)}px;
  background-color: ${({ theme }) => theme.colors.background};
`

export const ReturnContainer = styled.TouchableOpacity`
  width: ${RFValue(68)}px;
  flex-direction: row;
  align-items: center;
  left: -${RFValue(6)}px;
  margin: ${RFValue(18)}px;
`

export const ReturnText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.primary_dark};
  font-size: ${RFValue(10)}px;
  margin-left: ${RFValue(8)}px;
`
