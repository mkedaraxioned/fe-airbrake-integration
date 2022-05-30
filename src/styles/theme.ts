import { extendTheme } from '@chakra-ui/react';
import Button from './buttonStyleComponent';
import { styles as globalStyle } from './globalStyle';

export const costomTheme = extendTheme({
  styles: {
    global: {
      ...globalStyle,
    },
  },
  colors: {
    primary: '#201547',
    primaryLight: '#201547',
    bgPrimary: '#F4FBFF',
    bgSecondary: '#16C6CC',
    textLight: '#7C7A80',
    textLightExtra: '#A5A5A5',
    textLightMid: '#9C9C9C',
    bPink: '#F64545',
    bOrange: '#FF781C',
    bGreen: '#5AD030',
    borderPrimary: '#E7E7E7',
    borderSecondary: '#E1E1E1',
  },
  components: {
    Button,
  },
});
