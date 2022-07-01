import { chakra, Box, useRadio, Text, Flex } from '@chakra-ui/react';
import React from 'react';
const CustomRadio = (props: any) => {
  const { ...radioProps } = props;
  const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
    useRadio(radioProps);
  return (
    <chakra.label {...htmlProps} cursor='pointer' onChange={props.onChange}>
      <input value={props.value} {...getInputProps({})} hidden />
      <Flex alignItems='center'>
        <Box
          {...getCheckboxProps()}
          bg={state.isChecked ? 'btnPurple' : 'white'}
          w='16px'
          h='16px'
          border='2px'
          borderColor={state.isChecked ? 'transparent' : 'borderColor'}
          rounded='full'
          display='flex'
          alignItems='center'
        >
          <Box
            w='6px'
            h='6px'
            border='1px'
            bg='white'
            borderColor={state.isChecked ? 'borderColor' : 'transparent'}
            rounded='full'
            m='0 auto'
            {...getLabelProps()}
          />
        </Box>
        <Text pl='8px' fontSize='14px' lineHeight='17.6px'>
          {props.lable}
        </Text>
      </Flex>
    </chakra.label>
  );
};
export default CustomRadio;
