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
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { allClients } from '../../redux/reducers/clientsSlice';
import { _get, _patch, _post } from '../../utils/api';
import ClientList from '../clientList';

export interface FormData {
  name?: string;
  id?: string;
}

interface Prop {
  onClose: () => void;
}

const NewClient = ({ onClose }: Prop) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    id: '',
  });
  const [errMsg, setErrMsg] = useState<FormData>();
  const toast = useToast();
  const dispatch = useDispatch();
  const listContainer = useRef<any>();
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
  const fetchClient = async () => {
    const clientRes = await _get('api/clients');
    dispatch(allClients(clientRes?.data?.clients));
  };

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setErrMsg(fieldValidation());
      const notValid = fieldValidation();
      if (Object.values(notValid).length <= 0) {
        if (formData.id) {
          await _patch(`api/clients/${formData.id}`, { name: formData.name });
        } else {
          await _post('api/clients/', { name: formData.name });
        }
        reset();
        fetchClient();
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
      ref={listContainer}
      w='full'
      p='48px 60px 60px'
      pos='absolute'
      top={0}
      right={0}
      color='grayLight'
      textStyle='sourceSansProRegular'
    >
      <Heading
        color='grayLight'
        textStyle='sourceSansProBold'
        fontSize='22px'
        lineHeight='27.65px'
      >
        Manage client
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
              border='1px'
              borderColor={`${formData.id ? 'btnPurple' : 'borderColor'}`}
              boxShadow={`${formData.id ? '0 0 0 0.5px btnPurple' : 'none'}`}
              lineHeight='17.6px'
              onChange={inputHandler}
              value={formData.name}
            />
            <FormErrorMessage>{errMsg?.name}</FormErrorMessage>
          </FormControl>
          <Box pt='22px'>
            <Button
              w='110px'
              fontSize='15px'
              h='38px'
              type='submit'
              variant='primary'
              mr='22px'
            >
              {formData.id ? 'Update' : 'Save'}
            </Button>
            <Button
              w='105px'
              h='38px'
              variant='secondary'
              onClick={reset}
              fontSize='15px'
            >
              Clear
            </Button>
          </Box>
        </form>
      </Box>
      <ClientList
        setFormData={setFormData}
        onClose={onClose}
        listContainer={listContainer}
      />
    </Box>
  );
};

export default NewClient;
