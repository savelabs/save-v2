import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

import styled from "styled-components/native";

export const Container = styled(RectButton)`
  height: ${RFValue(56)}px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 16px;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semibold};
  color: ${({ theme }) => theme.colors.background};
  font-size: ${RFValue(16)}px;
`
