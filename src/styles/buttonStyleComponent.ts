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
      textStyle: 'sourceSansProRegular',
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
      textStyle: 'sourceSansProRegular',
    },
  },
  defaultProps: {},
};

export default Button;
