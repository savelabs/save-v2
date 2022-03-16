import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { ShapeGradient } from "../../../components/ShapeGradient";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const HeaderContainer = styled.View`
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

export const ButtonContainer = styled.View`
  margin: ${RFValue(18)}px ${RFValue(48)}px;
`

export const UploadButton = styled(ShapeGradient)`
  padding: ${RFValue(8)}px;

  width: 100%;
  border-radius: ${RFValue(16)}px;

  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

export const UploadText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.primary_dark};
`
