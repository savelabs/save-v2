import styled from 'styled-components/native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

import Animated from 'react-native-reanimated';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const IllustrationContainer = styled.View`
  margin-top: ${getStatusBarHeight()}px;

  align-items: center;
  z-index: 1;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.text};

  line-height: ${RFValue(24)}px;
`;

export const Fields = styled.View`
  margin: ${RFValue(20)}px 0;
`

export const FormContainer = styled(Animated.View)`
  flex: 1;

  padding: 28px 28px 8px 28px;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.background};
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
`;

export const Policy = styled.Text`
  align-self: center;
  margin: ${RFValue(18)}px ${RFValue(18)}px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.primary};
`
