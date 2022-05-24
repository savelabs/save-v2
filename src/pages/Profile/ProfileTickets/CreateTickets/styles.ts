import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { ShapeGradient } from "../../../../components/ShapeGradient";

type PeriodButtonProps = {
  isFirstElement?: boolean,
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

export const CreateArea = styled.View`
  padding: ${RFValue(18)}px;
`


export const PeriodScroll = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

export const PeriodContainer = styled.View`
  height: ${RFValue(42)}px;
  margin-bottom: ${RFValue(28)}px;
`

export const PeriodButtonSelected = styled(ShapeGradient)<PeriodButtonProps>`
  padding: ${RFValue(8)}px ${RFValue(18)}px;
  border-radius: ${RFValue(16)}px;
  align-items: center;
  justify-content: center;
  elevation: 2;
  margin-bottom: ${RFValue(3)}px;
  ${(props) => props.isFirstElement && css`margin-left: 1px;`};
`

export const PeriodButton = styled.TouchableOpacity<PeriodButtonProps>`
  background-color: ${({ theme }) => theme.colors.shape};
  padding: ${RFValue(8)}px ${RFValue(18)}px;
  border-radius: ${RFValue(16)}px;
  align-items: center;
  justify-content: center;
  elevation: 2;
  margin-bottom: ${RFValue(3)}px;
  ${(props) => props.isFirstElement && css`margin-left: 1px;`};
`

export const PeriodText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text};
`
