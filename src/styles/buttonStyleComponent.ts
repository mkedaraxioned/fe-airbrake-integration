import type { ComponentStyleConfig } from '@chakra-ui/theme';
import { darken } from '@chakra-ui/theme-tools';

const Button: ComponentStyleConfig = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: {
      bg: 'bgSecondary',
      borderColor: 'purple.500',
      color: 'white',
      fontSize: '12.46px',
      lineHeight: '18.69px',
      _hover: {
        bg: darken('bgSecondary', 5),
      },
    },
  },
  defaultProps: {},
};

export default Button;
