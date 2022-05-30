import type { ComponentStyleConfig } from '@chakra-ui/theme';
import {whiten, darken } from '@chakra-ui/theme-tools';

const Button: ComponentStyleConfig = {
  sizes: {
  },
  variants: {
    primary: {
      h:'37.21px',
      bg: 'bgSecondary',
      borderColor: 'purple.500',
      color: 'white',
      fontSize: '12.46px',
      lineHeight: '18.69px',
      _hover: {
        bg: darken('bgSecondary', 5),
      },
    },
    secondary: {
      h:'37.21px',
      bg: 'primary',
      border:'1px',
      borderColor: 'white',
      color: 'white',
      fontSize: '12.46px',
      lineHeight: '18.69px',
      _hover: {
        bg: whiten('primary', 30),
      },
    },
  },
  defaultProps: {
    
  },
};

export default Button;
