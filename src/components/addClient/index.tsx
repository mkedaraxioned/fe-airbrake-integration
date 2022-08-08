import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { _post } from '../../utils/api';

interface FormData {
  name?: string;
}

interface Prop {
  onClose: () => void;
}

const NewClient = ({ onClose }: Prop) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
  });
  const [errMsg, setErrMsg] = useState<FormData>();
  const toast = useToast();
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fieldValidation = () => {
    const errors: FormData = {};
    const { name } = formData;

    if (!name) {
      errors.name = 'Please enter client name.';
    }
    return errors;
  };

  const reset = () => {
    setFormData({
      name: '',
    });
    setErrMsg({ name: '' });
  };

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setErrMsg(fieldValidation());
      const notValid = fieldValidation();
      if (Object.values(notValid).length <= 0) {
        await _post('api/clients/', formData);
        reset();
        onClose();
        toast({
          title: 'Client',
          description: 'New client created successfully.',
          status: 'success',
          duration: 2000,
          position: 'top-right',
          isClosable: true,
        });
      }
    } catch (error: any) {
      const { error: errorMessage } = error.response.data;
      toast({
        title: 'Client',
        description: errorMessage,
        status: 'error',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  return (
    <Box
      w='full'
      p='40px 60px 60px'
      pos='absolute'
      top={0}
      right={0}
      color='grayLight'
      textStyle='sourceSansProRegular'
    >
      <Heading
        textStyle='sourceSansProBold'
        fontSize='22px'
        lineHeight='27.65px'
      >
        Add a new client
      </Heading>
      <Box>
        <form onSubmit={formHandler}>
          <FormControl p='15px 0' isInvalid={errMsg?.name ? true : false}>
            <FormLabel fontSize='14px' lineHeight='17.6px' fontWeight='600'>
              Client name
            </FormLabel>
            <Input
              type='text'
              name='name'
              placeholder='Please enter client name'
              fontSize='14px'
              lineHeight='17.6px'
              onChange={inputHandler}
              value={formData.name}
            />
            <FormErrorMessage>{errMsg?.name}</FormErrorMessage>
          </FormControl>
          <Box pt='22px'>
            <Button w='137px' type='submit' variant='primary' mr='22px'>
              Save
            </Button>
            <Button w='105px' variant='secondary' onClick={reset}>
              Clear
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default NewClient;
