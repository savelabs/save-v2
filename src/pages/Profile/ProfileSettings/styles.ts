import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { ShapeGradient } from "../../../components/ShapeGradient";

type ModalButtonProps = {
  selected?: boolean;
}

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const HeaderContainer = styled.View`
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

export const NavTextContainer = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

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


export const ModalOverlayContainer = styled.View`
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

export const ImageContainer = styled.View`
  width: 100%;
  align-items: center;
`

export const ModalContainer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.shape};
  border-top-left-radius: ${RFValue(18)}px;
  border-top-right-radius: ${RFValue(18)}px;
  padding: ${RFValue(32)}px;

  align-items: center;
  position: absolute;
  bottom: 0;
`

export const ModalText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text};

  text-align: center;
  padding-bottom: ${RFValue(20)}px;
`

export const ModalButton = styled.TouchableOpacity<ModalButtonProps>`
  width: 100%;
  padding: ${RFValue(10)}px;
  border-radius: ${RFValue(16)}px;

  background-color: ${({ theme }) => theme.colors.background};
  margin-top: ${RFValue(10)}px;

  align-items: center;
  justify-content: center;

  ${(props) => props.selected && (
    css`
      background-color: ${({ theme }) => theme.colors.gradient1};
    `
  )}

  elevation: 0.6;
`

export const ModalTextButton = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const ModalTextSecurity = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};

  padding: ${RFValue(18)}px 0px;
  text-align: justify;
`
