import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { _post } from '../../utils/api';
import { timeStringValidate } from '../../utils/validation';

interface Props {
  onClose: () => void;
  projectId: string;
  name: string;
}

interface MilestoneData {
  projectId?: string;
  title?: string;
  budget?: string;
}

const CreateMilestone = ({ onClose, projectId, name }: Props) => {
  const [formData, setFormData] = useState<Required<MilestoneData>>({
    projectId,
    title: '',
    budget: '',
  });

  const [errMsg, setErrMsg] = useState<MilestoneData>();
  const toast = useToast();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'budget') {
      if (timeStringValidate(e.target.value)) {
        setErrMsg({ ...errMsg, budget: 'Please enter valid time' });
      } else {
        setErrMsg({ ...errMsg, budget: '' });
      }
    }
  };

  const fieldValidation = () => {
    const errors: MilestoneData = {};
    const { title, budget } = formData;

    if (!title) {
      errors.title = 'Please enter milestone. ';
    }
    if (!budget) {
      errors.budget = 'Please enter valid time';
    }
    return errors;
  };

  const reset = () => {
    setFormData({
      projectId: '',
      title: '',
      budget: '',
    });
    onClose();
  };

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setErrMsg(fieldValidation());
      const notValid = fieldValidation();
      if (Object.values(notValid).length <= 0) {
        await _post('api/milestones/', {
          ...formData,
          budget: `${parseFloat(formData.budget).toFixed(2)}`,
        });
        onClose();
        reset();
        toast({
          title: 'Project',
          description: 'Milestone created successfully.',
          status: 'success',
          duration: 2000,
          position: 'top-right',
          isClosable: true,
        });
      }
    } catch (error) {
      error &&
        toast({
          title: 'Project',
          description: 'Milestone not created.',
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
      color='textLightMid'
      textStyle='sourceSansProRegular'
    >
      <Heading
        mb='10px'
        textStyle='sourceSansProBold'
        fontSize='22px'
        lineHeight='27.65px'
      >
        Create Milestone
      </Heading>
      <Box>
        <form onSubmit={formHandler}>
          <FormControl p='8px 0'>
            <FormLabel fontSize='14px' lineHeight='17.6px' fontWeight='600'>
              Project Name
            </FormLabel>
            <Input
              type='text'
              name='title'
              disabled
              placeholder='Please enter project name'
              fontSize='14px'
              lineHeight='17.6px'
              value={name}
            />
          </FormControl>
          <HStack justifyContent='space-between' m='14px 0 40px'>
            <FormControl
              w='70%'
              pos='relative'
              isInvalid={errMsg?.title ? true : false}
            >
              <FormLabel
                htmlFor='select_task'
                color='textLightMid'
                fontSize='14px'
                lineHeight='17.6px'
                textStyle='sourceSansProBold'
              >
                Milestone
              </FormLabel>
              <Input
                type='text'
                value={formData.title}
                textStyle='sourceSansProRegular'
                onChange={inputHandler}
                name='title'
                placeholder='Please enter milestone'
                fontSize='14px'
                lineHeight='17.6px'
              />
              <FormErrorMessage pos='absolute' bottom='-18px'>
                {errMsg?.title}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              w='143px'
              mr='10px'
              pos='relative'
              isInvalid={errMsg?.budget ? true : false}
            >
              <FormLabel
                htmlFor='add_time'
                color='textLightMid'
                fontSize='14px'
                lineHeight='17.6px'
                textStyle='sourceSansProBold'
              >
                Budget
              </FormLabel>
              <Flex
                alignItems='center'
                rounded='md'
                border='1px'
                borderColor='borderColor'
              >
                <Input
                  w='50%'
                  h='38px'
                  id='add_time'
                  boxSizing='border-box'
                  type='text'
                  value={formData.budget}
                  name='budget'
                  onChange={inputHandler}
                  border='none'
                  placeholder='88:88'
                  fontSize='14px'
                  textStyle='sourceSansProRegular'
                  lineHeight='17.6px'
                />
                <Text
                  w='50%'
                  h='38px'
                  textAlign='center'
                  p='8px 0'
                  bg='inputBg'
                  fontSize='14px'
                  lineHeight='21px'
                  color='textLightMid'
                  textStyle='sourceSansProRegular'
                >
                  Hours
                </Text>
              </Flex>
              <FormErrorMessage pos='absolute' bottom='-18px'>
                {errMsg?.budget}
              </FormErrorMessage>
            </FormControl>
          </HStack>
          <Box>
            <Button w='137px' type='submit' variant='primary' mr='22px'>
              Save
            </Button>
            <Button w='105px' variant='secondary' onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default CreateMilestone;
