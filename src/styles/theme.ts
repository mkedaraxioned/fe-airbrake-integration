import { extendTheme } from '@chakra-ui/react';

export const costomTheme = extendTheme({
  styles: {
    global: {
      '.wrapper': {
        maxWidth: '1380px',
        width: '95%',
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
  },
});
