import { RFValue } from "react-native-responsive-fontsize"
import styled, { css } from "styled-components/native"

type AlertProps = {
  isAlert?: boolean
}

export const ClassTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${RFValue(16)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${RFValue(18)}px;
`

export const ClassDataContainer = styled.View`
  width: 100%;
  margin-top: ${RFValue(18)}px;

  border-radius: ${RFValue(18)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  padding-bottom: ${RFValue(18)}px;

  elevation: 2;
`

export const ClassDataHeader = styled.View`
  width: 100%;
  padding: ${RFValue(12)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const ClassDataText = styled.Text<AlertProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.text};

  ${(props) => props.isAlert && (
    css`
      color: ${({ theme }) => theme.colors.alert};
    `
  )}
`

export const ClassDataDescription = styled.View`
  width: 100%;
  padding: ${RFValue(12)}px;
  background-color: ${({ theme }) => theme.colors.background};
`

export const ClassTextDescription = styled.Text<AlertProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.text};

  ${(props) => props.isAlert && (
    css`
      color: ${({ theme }) => theme.colors.alert};
    `
  )}
`

export const ClassTextTeacher = styled.Text<AlertProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(8)}px;
  color: ${({ theme }) => theme.colors.text};


  ${(props) => props.isAlert && (
    css`
      color: ${({ theme }) => theme.colors.alert};
    `
  )}
`
