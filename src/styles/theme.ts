import { extendTheme } from '@chakra-ui/react';
import Button from './buttonStyleComponent'
import { lighten } from '@chakra-ui/theme-tools';

export const costomTheme = extendTheme({
  styles: {
    global: {
      body:{
        backgroundColor:'bgPrimary',
      },
      '.wrapper': {
        maxWidth: '1410px',
        width: '94%',
        margin: '0 auto',
      },
      '.menu-anchor': {
        width: '100%',
        display: 'inline-block',
      },
      '.date_body': {
        '.date_row div': {
          border: '.7px solid #E0E0E0',
        },
        '.date_row div:nth-child(7n)': {
          borderRight: 'none',
        },
        '.date_row div:nth-child(1n)': {
          borderLeft: 'none',
          borderTop: 'none',
        },
        '.date_row:last-child div': {
          borderBottom: 'none',
        },
      },
    },
  },
  colors: {
    primary: '#201547',
    primaryLight: '#201547',
    bgPrimary:'#F4FBFF',
    bgSecondary:'#16C6CC',
    textLight:'#7C7A80',
    textLightExtra:'#A5A5A5',
    textLightMid:'#9C9C9C',
    bPink: '#F64545',
    bOrange: '#FF781C',
    bGreen:'#5AD030',
    borderPrimary:'#E7E7E7',
  },
  components: {
    Button,
  },
});
