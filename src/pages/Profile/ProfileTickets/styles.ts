import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { ShapeGradient } from "../../../components/ShapeGradient";

type ModalButtonProps = {
  alertButton?: boolean
}

export const LoadingContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Container = styled.ScrollView`
  flex: 1;
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

export const CreateButton = styled(ShapeGradient)`
  padding: ${RFValue(8)}px;
  width: ${RFValue(178)}px;
  border-radius: ${RFValue(16)}px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const CreateText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.primary_dark};
`


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
  margin-bottom: ${RFValue(28)}px;
`

export const TicketContainer = styled.View`
  width: 100%;
  padding: ${RFValue(12)}px  ${RFValue(18)}px;
  background-color: ${({ theme }) => theme.colors.shape};

  margin-top: ${RFValue(28)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const RegularText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(11)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const SemiboldText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const HeaderContainer = styled.View`
  align-items: center;
  width: 100%;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${RFValue(16)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${RFValue(18)}px;
`

export const ShapeIcon = styled(ShapeGradient)`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  border-radius: ${RFValue(16)}px;

  align-items: center;
  justify-content: center;
`

export const ModalOverlayContainer = styled.View`
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

export const ModalContainer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  border-top-left-radius: ${RFValue(18)}px;
  border-top-right-radius: ${RFValue(18)}px;

  align-items: center;
  position: absolute;
  bottom: 0;
  padding: ${RFValue(20)}px;
`

export const ModalText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${RFValue(22)}px;
  color: ${({ theme }) => theme.colors.text};

  text-align: center;
  margin-bottom: ${RFValue(18)}px;
`

export const ModalButton = styled.TouchableOpacity<ModalButtonProps>`
  width: 100%;
  padding: ${RFValue(12)}px;
  background-color: ${({ theme }) => theme.colors.gradient1};
  border-radius: ${RFValue(16)}px;
  margin-top: ${RFValue(18)}px;

  align-items: center;
  justify-content: center;

  ${(props) => props.alertButton && (
    css`
      background-color: ${({ theme }) => theme.colors.primary_light};
    `
  )}
`

export const ModalTextButton = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`
