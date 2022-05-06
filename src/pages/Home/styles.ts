import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { ShapeGradient } from "../../components/ShapeGradient";

type ModalButtonProps = {
  alertButton?: boolean
}

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
  padding: ${RFValue(28)}px;
`

export const LoadingContainer = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
  justify-content: center;
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

  border-radius: ${RFValue(48/2)}px;
  background-color: ${({ theme }) => theme.colors.text_white};
`

export const BellContainer = styled.TouchableOpacity`
  padding: ${RFValue(8)}px;
  border-radius: 28px;
  margin-right: ${RFValue(18)}px;
  align-items: center;
  justify-content: center;
`

export const UserButton = styled.TouchableOpacity`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: ${RFValue(48/2)}px;

  align-items: center;
  justify-content: center;
`

export const CardContainer = styled(ShapeGradient)`
  width: 100%;
  border-radius: 24px;
  padding: ${RFValue(12)}px;
  margin-bottom: ${RFValue(28)}px;
`

export const FlexContainer = styled(ShapeGradient)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

export const CardTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const CardText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
`
export const CardTextMedium = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.primary_dark};
`

export const CardBox = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.shape};
  padding: ${RFValue(12)}px;
  border-radius: 24px;
  elevation: 2;
`

export const ImageContainer = styled.View`
  width: 50%;
  align-items: center;
  justify-content: center;
`

export const ShareButton = styled.TouchableOpacity`
  width: ${RFValue(42)}px;
  height: ${RFValue(42)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  elevation: 2;
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

export const CardBoxButton = styled.TouchableOpacity`
  width: 100%;
  margin-top: ${RFValue(8)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  padding: ${RFValue(12)}px;
  border-radius: 24px;
  elevation: 2;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
