import { RFValue } from "react-native-responsive-fontsize"
import styled from "styled-components/native"
import { ShapeGradient } from "../../../../components/ShapeGradient"

export const InfoTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${RFValue(16)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${RFValue(18)}px;
`

export const InfoContainer = styled.View`
  width: 100%;
  margin-top: ${RFValue(18)}px;

  border-radius: ${RFValue(18)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  padding-bottom: ${RFValue(18)}px;

  elevation: 2;
`

export const InfoHeader = styled.View`
  width: 100%;
  padding: ${RFValue(12)}px;
  align-items: center;
  justify-content: center;
`

export const InfoHeaderText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const TeacherContainer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  margin-bottom: ${RFValue(10)}px;
`

export const TeacherProfile = styled.View`
  padding: ${RFValue(12)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const TeacherImage = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: ${RFValue(24)}px;
`

export const TeacherInfos = styled.View`
  width: 60%;
`

export const TeacherName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: right;
`
export const TeacherNumber = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: right;
`

export const TeacherEmail = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: ${RFValue(12)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  elevation: 1;
`

export const InfoText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const InfoMediumText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const InfoGradient = styled(ShapeGradient)`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  border-radius: 18px;

  align-items: center;
  justify-content: center;
`

export const InfoEmail = styled.TouchableOpacity`
  elevation: 3;
`

export const InfoLocalContainer = styled.View`
  padding: ${RFValue(12)}px;
  background-color: ${({ theme }) => theme.colors.background};
`
