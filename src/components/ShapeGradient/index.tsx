import React from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

export function ShapeGradient({ ...rest }) {
  const { colors } = useContext(ThemeContext)

  return (
    <LinearGradient
      colors={[colors.gradient1, colors.gradient2]}
      start={[1, 0]}
      end={[0, 1]}
      {...rest}
    />
  )
}
