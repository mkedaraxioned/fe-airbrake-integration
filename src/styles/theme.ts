import { extendTheme } from '@chakra-ui/react';
import Button from './buttonStyleComponent';
import Radio from './radioButtonStyleComponent';
import { styles as globalStyle } from './globalStyle';
import { textStyle } from './textStyle';

const breakpoints = {
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

export const costomTheme = extendTheme({
  styles: {
    global: {
      ...globalStyle,
    },
  },
  fonts: {
    sourceSansPro: `'Source Sans Pro'`,
  },
  textStyles: {
    ...textStyle,
  },
  breakpoints,
  radii: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.3125rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  colors: {
    primary: '#201547',
    textColor: '#050505',
    textLight: '#B0B0B1',
    grayLight: '#363636',
    textGray: '#797979',
    textLogH: '#00B894',
    textLogC: '#656565',
    borderColor: '#E2E8F0',
    borderPrimary: '#D4E6F4',
    borderDark: '#718096',
    borderSecondary: '#E1E1E1',
    royalDarkBlue: '#2333A1',
    btnPurple: '#4657CE',
    purple: '#7A84CA',
    purpleDark: '#3E467E',
    purpleLight: '#D1D5EE',
    grayColor: '#EDF2F7',
    accordianBg: '#E2E8F066',
    accordianParentBg: '#6973B5',
    accordianChildBg: '#7A84CA',
    grayMid: '#F2F2F2',
    tabBg: ' #F8F8F8',
    greenLight: '#00BB8B',
    greenLightBg: '#DFF7F1',
    redLightBg: '#FFF2F2',
    bgPrimary: '#FBFBFC',
    reportCta: '#676767',
    bgSecondary: '#F9FAFB',
    bgLight: '#FDFDFD',
    bgGray: '#ECECEC',
    inputBg: '#F3F6F9',
    bgGrayLight: '#F9FAFC',
    extraLightBlack: '#696969',
    bgLog: '#CDF6ED',
    bgCard: '#F5F7F8',
    bilColor: '#00B894',
    nbilColor: '#EB3839',
  },
  components: {
    Button,
    Radio,
  },
});

export const customTheme2 = extendTheme();
