import React from 'react';
import { Box, useCheckbox } from '@chakra-ui/react';

const CustomCheckbox = (props: any) => {
  const { getInputProps, getCheckboxProps } = useCheckbox(props);

  const input:any = getInputProps();
  const checkbox = getCheckboxProps();

  console.log(checkbox)
  return (
    <Box as='label'>
      <input {...input}/>
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        defaultChecked={true}
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
      </Box>
    </Box>
  );
};

export default CustomCheckbox;
