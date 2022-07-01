import { chakra, Box, useCheckbox } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineCheckCircle, AiFillCheckCircle } from 'react-icons/ai';

const CustomCheckbox = (props: any) => {
  const { state, getInputProps, htmlProps } = useCheckbox(props);

  return (
    <chakra.label cursor='pointer' {...htmlProps} onChange={props.onChange}>
      <input {...getInputProps()} hidden />

      {!state.isChecked && (
        <Box color='#439F6E' fontSize='20px'>
          <AiOutlineCheckCircle />
        </Box>
      )}
      {state.isChecked && (
        <Box color='#439F6E' fontSize='20px'>
          <AiFillCheckCircle />
        </Box>
      )}
    </chakra.label>
  );
};

export default CustomCheckbox;
