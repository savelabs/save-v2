import { RFValue } from "react-native-responsive-fontsize"
import styled, { css } from "styled-components/native"
import { ShapeGradient } from "../../../../components/ShapeGradient"

type ModalButtonProps = {
  alertButton?: boolean
}

export const Container = styled.View`
  width: 100%;
  padding: 0px ${RFValue(48)}px;

  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
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

export const StudentImage = styled.Image`
  width: ${RFValue(88)}px;
  height: ${RFValue(88)}px;
  border-radius: ${RFValue(44)}px;

  background-color: ${({ theme }) => theme.colors.border};
`

export const StudentImageButton = styled.TouchableOpacity`
  width: ${RFValue(88)}px;
  height: ${RFValue(88)}px;
  border-radius: ${RFValue(44)}px;

  align-items: center;
  justify-content: center;
`

export const StudentName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const StudentSchoolID = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const OptionsContainer = styled.View`
  width: 100%;
  margin-top: ${RFValue(18)}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const SingOutButton = styled(ShapeGradient)`
  padding: ${RFValue(8)}px;
  width: ${RFValue(138)}px;
  border-radius: ${RFValue(16)}px;

  align-items: center;
  justify-content: center;
`

export const SingOutText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.primary_dark};
`

export const IconButton = styled.TouchableOpacity`
  width: ${RFValue(38)}px;
  height: ${RFValue(38)}px;
  border-radius: ${RFValue(20)}px;

  align-items: center;
  justify-content: center;
`
