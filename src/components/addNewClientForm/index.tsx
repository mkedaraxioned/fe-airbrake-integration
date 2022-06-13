import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React from 'react';

const AddNewClientForm = () => {
  return (
    <Box>
      <form>
        <Flex alignItems='flex-end' p='26px 0'>
          <FormControl maxW='380px' w='80%'>
            <FormLabel htmlFor='client_name' fontSize='12px' lineHeight='18px'>
              Client Name
            </FormLabel>
            <Input
              id='client_name'
              type='text'
              value={''}
              placeholder='Please enter client name'
              fontSize='14.18px'
              lineHeight='21.28px'
            />
          </FormControl>
          <Box ml='20px'>
            <Button variant='secondary' w='116px' h='41px'>
              Save
            </Button>
          </Box>
        </Flex>
      </form>
    </Box>
  );
};

export default AddNewClientForm;
