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
  margin-bottom: ${RFValue(28)}px;
`

export const ReturnText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.primary_dark};
  font-size: ${RFValue(10)}px;
  margin-left: ${RFValue(8)}px;
`

export const GradeSubjectContainer = styled.View`
  width: 100%;
  border-radius: ${RFValue(24)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  padding: ${RFValue(12)}px;
  margin-bottom: ${RFValue(28)}px;
`

export const SubjectTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};

  text-align: center;
`

export const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const SubjectRegular = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(11)}px;
  margin-left: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text};
`


export const CardContainer = styled.View`
  width: 100%;
  border-radius: ${RFValue(24)}px;
  background-color: ${({ theme }) => theme.colors.shape};


  padding: ${RFValue(18)}px;
  margin-top: ${RFValue(18)}px;
  elevation: 2;
`
