import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
`

export const HeaderContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${RFValue(28)}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Hello = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text_white};

`

export const StudentName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text_white};

  line-height: ${RFValue(16)}px;
`

export const NavContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const UserImage = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  margin-left: ${RFValue(18)}px;
  border-radius: ${RFValue(48/2)}px;
  background-color: ${({ theme }) => theme.colors.text_white};
`
