import { extendTheme } from '@chakra-ui/react';
import Button from './buttonStyleComponent';
import { styles as globalStyle } from './globalStyle';

export const costomTheme = extendTheme({
  styles: {
    global: {
      ...globalStyle,
    },
  },
  fonts: {
    SourceSansProExtraLight: `'SourceSansPro-ExtraLight';`,
    subHeading: `'Times New Roman';`,
  },
  textStyles: {
    h3: {
      'font-family': 'var(--chakra-fonts-subHeading)',
    },
  },
  colors: {
    primary: '#201547',
    primaryLight: '#201547',
    bgPrimary: '#F4FBFF',
    bgSecondary: '#16C6CC',
    bgLight: '#F9FAFB',
    textColor: '#050505',
    textLight: '#B0B0B1',
    textLightExtra: '#A5A5A5',
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
