import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

import styled from "styled-components/native";

export const Container = styled(RectButton)`
  height: ${RFValue(48)}px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 16px;

  align-items: center;
  padding: ${RFValue(8)}px;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semibold};
  color: ${({ theme }) => theme.colors.background};
  font-size: ${RFValue(12)}px;
  text-align: center;
  line-height: ${RFValue(14)}px;
`
