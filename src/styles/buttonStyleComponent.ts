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
        bg: 'royalDarkBlue',
        color: 'white',
      },
    },
    secondary: {
      border: '1px',
      borderColor: 'btnPurple',
      color: 'btnPurple',
      fontSize: '12.46px',
      lineHeight: '18.69px',
      _hover: {
        bg: 'white',
        color: 'royalDarkBlue',
        borderColor: 'royalDarkBlue',
      },
    },
  },
  defaultProps: {},
};

export default Button;
