import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import styled, { css } from 'styled-components/native';

interface Props {
  password?: boolean;
  border: string;
}

export const InputContainer = styled.View`
  margin-bottom: ${RFValue(8)}px;
`

export const BorderContainer = styled.View`
  height: ${RFValue(64)}px;
  width: 100%;

  padding: 2px;
  align-items: center;
  flex-direction: row;

  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 16px;
`

export const Container = styled(TextInput)<Props>`
  height: 100%;
  padding: 10px 16px;
  flex: 1;

  background-color: ${({ theme }) => theme.colors.shape};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;

  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;

  ${(props) => props.border && (
    css`
      border: 2px solid ${props.border};
    `
  )}

  ${(props) => props.password && (
    css`
      border-right-width: 0px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    `
  )}

`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const PasswordButton = styled.View<Props>`
  justify-content: center;
  align-items: center;

  height: 100%;
  width: ${RFValue(48)}px;

  border: 2px solid ${({ theme }) => theme.colors.border};
  border-left-width: 0px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-radius: 16px;

  ${(props) => props.border && (
    css`
      border: 2px solid ${props.border};
    `
  )}
`
