import { chakra, Box, useRadio } from '@chakra-ui/react';
import React from 'react';
const CustomRadio = (props: any) => {
  const { ...radioProps } = props;
  const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
    useRadio(radioProps);

  return (
    <chakra.label {...htmlProps} cursor='pointer'>
      <input {...getInputProps({})} hidden />
      <Box
        {...getCheckboxProps()}
        bg={state.isChecked ? 'green.200' : 'blue'}
        w={5}
        p={1}
        rounded='full'
      >
        <Box w='3' h='3' bg='red' rounded='full' {...getLabelProps()} />
      </Box>
    </chakra.label>
  );
};
export default CustomRadio;
