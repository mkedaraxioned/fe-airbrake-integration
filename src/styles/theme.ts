import { extendTheme } from '@chakra-ui/react';
import Button from './buttonStyleComponent';
import { styles as globalStyle } from './globalStyle';
import { textStyle } from './textStyle';

export const costomTheme = extendTheme({
  styles: {
    global: {
      ...globalStyle,
    },
  },
  fonts: {
    sourceSansPro: `'Source Sans Pro'`,
  },
  textStyles:{
    ...textStyle
  },
  colors: {
    primary: '#201547',
    bgLight: '#F9FAFB',
    textColor: '#050505',
    textLight: '#B0B0B1',
    textLightMid: '#676767',
    borderColor: '#E2E8F0',
    borderPrimary: '#D4E6F4',
    borderSecondary: '#E1E1E1',
    btnPurple: '#4657CE',
    grayColor: '#EDF2F7',
    grayLight: '#696969',
    grayMid: '#F2F2F2',
  },
  components: {
    Button,
  },
});
