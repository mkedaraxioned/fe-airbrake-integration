import type { ComponentStyleConfig } from '@chakra-ui/theme';

const Button: ComponentStyleConfig = {
  sizes: {},
  variants: {
    primary: {
      bg: 'btnPurple',
      borderColor: 'btnPurple',
      border: '1px',
      color: 'white',
      fontSize: '12.46px',
      lineHeight: '18.69px',
      _hover: {
        bg: 'white',
        color: 'btnPurple',
      },
    },
    secondary: {
      border: '1px',
      borderColor: 'btnPurple',
      color: 'btnPurple',
      fontSize: '12.46px',
      lineHeight: '18.69px',
      _hover: {
        bg: 'btnPurple',
        color: 'white',
      },
    },
  },
  defaultProps: {},
};

export default Button;
