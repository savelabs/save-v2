import { FlatList } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { PeríodoLetivo } from "suap-sdk-javascript";
import { ShapeGradient } from "../../components/ShapeGradient";

type PeriodButtonProps = {
  isFirstElement?: boolean,
}

export const ScrollContainer = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.background};
`

export const Container = styled.View`
  padding: ${RFValue(28)}px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`
export const PeriodScroll = styled(FlatList as new () => FlatList<PeríodoLetivo>)`
  width: 100%;
`

export const PeriodContainer = styled.View`
  height: ${RFValue(38)}px;
`

export const PeriodButtonSelected = styled(ShapeGradient)<PeriodButtonProps>`
  height: ${RFValue(32)}px;
  padding: ${RFValue(9)}px ${RFValue(18)}px ${RFValue(9)}px ${RFValue(18)}px;
  border-radius: ${RFValue(16)}px;
  margin-left: ${RFValue(14)}px;

  display: flex;
  align-items: center;
  justify-content: center;

  elevation: 2;
  margin-top: ${RFValue(3)}px;

  ${(props) => props.isFirstElement && css`margin-left: 1px;`};
`

export const PeriodButton = styled.TouchableOpacity<PeriodButtonProps>`
  background-color: ${({ theme }) => theme.colors.shape};

  height: ${RFValue(32)}px;
  padding: ${RFValue(9)}px ${RFValue(18)}px ${RFValue(9)}px ${RFValue(18)}px;
  border-radius: ${RFValue(16)}px;
  margin-left: ${RFValue(14)}px;

  display: flex;
  align-items: center;
  justify-content: center;

  elevation: 3;
  margin-top: ${RFValue(3)}px;

  ${(props) => props.isFirstElement && css`margin-left: 1px;`};
`

export const PeriodText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text};
`

export const PickerTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(12)}px;

  margin: ${RFValue(12)}px 0px ${RFValue(2)}px 0px;
`

export const PickerContainer = styled(RectButton)`
  height: ${RFValue(48)}px;
  width: 100%;
  padding: 2px;

  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 15px;
  elevation: 2;

  align-items: center;
  flex-direction: row;
`

export const Picker = styled.View`
  width: 100%;
  height: 100%;

  padding: 10px 16px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 15px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const PickerPlaceholder = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.border};
  font-size: ${RFValue(12)}px;
`

export const NavbarContainer = styled.View`
  width: 100%;
  margin-top: ${RFValue(18)}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const NavbarButton = styled(RectButton)`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 16px;

  background-color:  ${({ theme }) => theme.colors.background};
  elevation: 3;
`

export const NavbarGradient = styled(ShapeGradient)`
  width: 100%;
  height: 100%;
  border-radius: 16px;

  align-items: center;
  justify-content: center;
`
