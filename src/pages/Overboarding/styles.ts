import styled from "styled-components/native";

import { RFValue } from "react-native-responsive-fontsize";
import Animated from 'react-native-reanimated';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  background-color: #69349E;
`

export const ScrollView = styled(Animated.ScrollView)`
  flex: 1;
  height: 100%;
`

export const Content = styled.View`
  height: 90%;
  width: 100%;
`

export const Header = styled.View`
  width: 100%;
  align-items: center;
  text-align: center;

  z-index: 1;
  position: absolute;
`

export const Welcome = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.sub};
  color: #f0f0fc;

`

export const Save = styled.Text`
  font-size: ${RFValue(64)}px;
  font-family: ${({ theme }) => theme.fonts.main};
  color: #f0f0fc;
  line-height: ${RFValue(62)}px;
`
