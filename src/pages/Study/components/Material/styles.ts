import { RFValue } from "react-native-responsive-fontsize"
import styled from "styled-components/native"
import { ShapeGradient } from "../../../../components/ShapeGradient"

export const MaterialTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${RFValue(16)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${RFValue(18)}px;
`

export const MaterialContainer = styled.View`
  flex: 1;
  margin-top: ${RFValue(18)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 24px;
  padding: ${RFValue(18)}px;
  elevation: 2;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const MaterialDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};

  max-width: 80%;
`

export const MaterialDate = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(8)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const MaterialGradient = styled(ShapeGradient)`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  border-radius: 18px;

  align-items: center;
  justify-content: center;
`

export const MaterialDownload = styled.TouchableOpacity`
  elevation: 3;
`
