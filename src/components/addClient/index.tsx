import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';

interface FormData {
  title?: string;
}

const NewClient = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
  });

  const [errMsg, setErrMsg] = useState<FormData>();
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const reset = () => {
    setFormData({
      title: '',
    });
    setErrMsg({ title: '' });
  };

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title } = formData;
    if (title) {
      alert('Success');
      reset();
    } else {
      setErrMsg({ title: 'Please enter client name' });
    }
  };

  return (
    <Box
      w='full'
      p='40px 60px 60px'
      pos='absolute'
      top={0}
      right={0}
      color='textLightMid'
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
          <FormControl p='15px 0' isInvalid={errMsg?.title ? true : false}>
            <FormLabel fontSize='14px' lineHeight='17.6px' fontWeight='600'>
              Client name
            </FormLabel>
            <Input
              type='text'
              name='title'
              placeholder='Please enter client name'
              fontSize='14px'
              lineHeight='17.6px'
              onChange={inputHandler}
              value={formData.title}
            />
            <FormErrorMessage>{errMsg?.title}</FormErrorMessage>
          </FormControl>
          <Box pt='22px'>
            <Button w='137px' type='submit' variant='primary' mr='22px'>
              Save
            </Button>
            <Button w='105px' variant='secondary' onClick={reset}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default NewClient;
