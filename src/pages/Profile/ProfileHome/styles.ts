import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { ShapeGradient } from "../../../components/ShapeGradient";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const HeaderContainer = styled.View`
  margin-top: ${RFValue(58)}px;
`

export const NavButton = styled(RectButton)`
  width: 100%;
  padding: ${RFValue(12)}px  ${RFValue(18)}px;
  background-color: ${({ theme }) => theme.colors.shape};

  margin-top: ${RFValue(28)}px;
  flex-direction: row;
  align-items: center;
`

export const ShapeIcon = styled(ShapeGradient)`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  border-radius: ${RFValue(16)}px;

  align-items: center;
  justify-content: center;
`

export const NavTextContainer = styled.View``

export const NavTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const NavDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(11)}px;
  color: ${({ theme }) => theme.colors.text};

  line-height: ${RFValue(16)}px;
  padding:  0px ${RFValue(18)}px;
`
