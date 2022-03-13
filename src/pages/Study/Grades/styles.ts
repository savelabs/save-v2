import { RFValue } from "react-native-responsive-fontsize"
import styled from "styled-components/native"

export const ScrollContainer = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.background};
`

export const Container = styled.View`
  padding: ${RFValue(28)}px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`
