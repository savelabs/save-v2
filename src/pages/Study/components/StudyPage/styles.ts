import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { PeríodoLetivo, TurmaVirtual } from 'suap-sdk-javascript';
import { ShapeGradient } from "../../../../components/ShapeGradient";
import { FlatList } from "react-native";

type PeriodButtonProps = {
  isFirstElement?: boolean,
}

type PickerPlaceholderProps = {
  isSelected: boolean,
}

export const PeriodScroll = styled(FlatList as new () => FlatList<PeríodoLetivo>)`
  width: 100%;
`

export const PeriodContainer = styled.View`
  height: ${RFValue(42)}px;
`

export const PeriodButtonSelected = styled(ShapeGradient)<PeriodButtonProps>`
  padding: ${RFValue(8)}px ${RFValue(18)}px;
  border-radius: ${RFValue(16)}px;
  margin-left: ${RFValue(14)}px;
  align-items: center;
  justify-content: center;
  elevation: 2;
  margin-top: ${RFValue(3)}px;
  margin-bottom: ${RFValue(3)}px;
  ${(props) => props.isFirstElement && css`margin-left: 1px;`};
`

export const PeriodButton = styled.TouchableOpacity<PeriodButtonProps>`
  background-color: ${({ theme }) => theme.colors.shape};
  padding: ${RFValue(8)}px ${RFValue(18)}px;
  border-radius: ${RFValue(16)}px;
  margin-left: ${RFValue(14)}px;
  align-items: center;
  justify-content: center;
  elevation: 2;
  margin-top: ${RFValue(3)}px;
  margin-bottom: ${RFValue(3)}px;
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

export const PickerContainer = styled.TouchableOpacity`
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
  padding: 10px 16px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const PickerPlaceholder = styled.Text<PickerPlaceholderProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.border};
  font-size: ${RFValue(11)}px;

  ${(props) => props.isSelected && css`color: ${({ theme }) => theme.colors.text};`}
  max-width: 86%;
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

export const GradeTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${RFValue(16)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${RFValue(18)}px;
`

export const TextDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(10)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`

export const GradeContainer = styled.View`
  width: 100%;
  margin-top: ${RFValue(18)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 24px;
  elevation: 2;
`
export const GradeHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
`
export const ColumnTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
`
export const SubjectPeriod = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 54%;
`

export const GradeBox = styled(RectButton)`
  width: 100%;
  padding: ${RFValue(8)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${RFValue(8)}px;
  background-color: ${({ theme }) => theme.colors.background};
`

export const SubjectTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(9)}px;
  color: ${({ theme }) => theme.colors.text};
  max-width: 44%;
`

export const GradeValueContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 56%;
`

export const GradeValue = styled(ShapeGradient)`
  width: ${RFValue(30)}px;
  height: ${RFValue(30)}px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`

export const GradeText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.primary_dark};
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
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const ModalBox = styled.View`
  width: 90%;
  height: ${RFValue(500)}px;
  background-color: ${({ theme }) => theme.colors.shape};

  padding-bottom: ${RFValue(12)}px;
  border-radius: 18px;
  elevation: 3;
`

export const ModalHeader = styled.View`
  padding: ${RFValue(12)}px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const ModalTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semibold};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
`

export const ModalScroll = styled(FlatList as new () => FlatList<TurmaVirtual>)``

export const ClassButton = styled.TouchableOpacity`
  width: 100%;
  margin-top: ${RFValue(4)}px;
  padding: ${RFValue(12)}px;
  background-color: ${({ theme }) => theme.colors.background};
`

export const ClassText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(12)}px;
`

export const ReturnContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  left: -${RFValue(6)}px;
  width: ${RFValue(128)}px;
`

export const ReturnText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.primary_dark};
  font-size: ${RFValue(10)}px;
  margin-left: ${RFValue(8)}px;
`
