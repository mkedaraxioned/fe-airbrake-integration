import { chakra, Box, useCheckbox } from '@chakra-ui/react';
import React from 'react';
import { RiCheckFill, RiCheckboxCircleLine } from 'react-icons/ri';

const CustomCheckbox = (props: any) => {
  const { state, getInputProps, htmlProps } = useCheckbox(props);

  return (
    <chakra.label cursor='pointer' {...htmlProps} onChange={props.onChange}>
      <input {...getInputProps()} hidden />

      {!state.isChecked && (
        <Box color='#439F6E' fontSize='21px'>
          <RiCheckFill />
        </Box>
      )}
      {state.isChecked && (
        <Box color='#439F6E' fontSize='21px'>
          <RiCheckboxCircleLine />
        </Box>
      )}
    </chakra.label>
  );
};

export default CustomCheckbox;
