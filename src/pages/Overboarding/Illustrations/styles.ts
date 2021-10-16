import styled from "styled-components/native"

import Animated from 'react-native-reanimated';

import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";
const width = Dimensions.get('window').width;


export const Container = styled.View`
  margin-top: 4%;
  height: 100%;
  width: ${width}px;
  justify-content: center;
`

export const IllustrationContainer = styled(Animated.View)`
  width: 70%;
  height: 75%;
  background-color: #5F2F8E;
  border-radius: 32px;

  align-items: center;
  justify-content: center;
`

export const OverBox = styled.View`
  width: ${width}px;
  height: 65%;
  align-items: center;
  justify-content: center;
`

export const Footer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`

export const Circle = styled.View`
  height: 8px;
  width: 8px;
  background: #f0f0fc;
  border-radius: 4px;
  margin: 2px;
`

export const BigCircle = styled.View`
  height: 14px;
  width: 14px;
  background: #f0f0fc;
  border-radius: 7px;
  margin: 2px;
`

export const StatusCircle = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Description = styled(Animated.Text)`
  width: 60%;
  margin-top: ${RFValue(18)}px;
  text-align: center;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: #f0f0fc;
`

export const Button = styled(RectButton)`
  margin-top: ${RFValue(22)}px;
  width: ${RFValue(218)}px;
  height: ${RFValue(48)}px;
  background-color: #5F2F8E;
  border-radius: 32px;

  align-items: center;
  justify-content: center;
`

export const ButtonText = styled.Text`
  text-align: center;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: #f0f0fc;
`
