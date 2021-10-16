import 'styled-components';
import { light, dark } from '../global/styles/themes';

declare module 'styled-components' {
  type ThemeType = typeof light;

  export interface DefaultTheme extends ThemeType {}
}
