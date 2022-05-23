import { extendTheme } from '@chakra-ui/react';

export const costomTheme = extendTheme({
  styles: {
    global: {
      '.wrapper': {
        maxWidth: '1227px',
        width: '86%',
        margin: '0 auto',
      },
      '.menu-anchor':{
        width:'100%',
        display:'inline-block'
      }
    },
  },
  colors: {
    primary: '#201547',
  },
});
