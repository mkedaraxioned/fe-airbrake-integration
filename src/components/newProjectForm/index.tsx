import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import {
  MemberObj,
  NewProjectFormData,
  NewProjectFormErr,
} from '../../interfaces/newProjectForm';
import './newProjectForm.modules.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AutoCompleteElem from '../autoComplete';

const NewProjectForm = () => {
  const [formData, setFormData] = useState<NewProjectFormData>({
    clientName: '',
    projectName: '',
    projectType: 'fixed',
    startDate: new Date(),
    endDate: null,
    billable: 'nonBillable',
    teamMembers: [],
  });

  const [errMsg, setErrMsg] = useState<NewProjectFormErr>();
  const [member, setMember] = useState<MemberObj | null>(null);

  const items = [
    {
      id: 0,
      name: 'Kedar M',
    },
    {
      id: 1,
      name: 'Vipin Y',
    },
    {
      id: 2,
      name: 'Dnyaneshwar I',
    },
    {
      id: 3,
      name: 'Prajakta P',
    },
    {
      id: 4,
      name: 'Anurag B',
    },
  ];

  const allClients = [
    {
      id: 0,
      name: 'Harvest',
    },
    {
      id: 1,
      name: 'Shutterstock',
    },
    {
      id: 2,
      name: 'Evok',
    },
  ];
  console.log(formData, 'formData');
  useEffect(() => {
    setTeamMembers();
  }, [member]);

  const selectClient = (item: MemberObj) => {
    setFormData({ ...formData, clientName: item.name });
  };
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? setFormData({ ...formData, billable: 'billable' })
      : setFormData({ ...formData, billable: 'nonBillable' });
  };
  const radioHandler = (val: 'fixed' | 'retainer' | 'retainer-granular') => {
    setFormData({ ...formData, projectType: val });
  };
  const selectMember = (item: MemberObj) => {
    setMember(item);
  };
  const setTeamMembers = () => {
    const arr = formData.teamMembers?.map((val) => val.id);
    if (!member) return null;
    if (!arr.includes(member.id)) {
      setFormData({
        ...formData,
        teamMembers: [...formData.teamMembers, member],
      });
      setErrMsg({ ...errMsg, teamMembers: '' });
      setMember(null);
    } else {
      setErrMsg({ ...errMsg, teamMembers: 'Team member already added' });
    }
  };
  const fieldValidation = () => {
    const errors: NewProjectFormErr = {};
    const {
      clientName,
      projectName,
      startDate,
      endDate,
      projectType,
      teamMembers,
    } = formData;

    if (!clientName) {
      errors.clientName = 'Please select client.';
    }
    if (!projectName) {
      errors.projectName = 'Please enter project name. ';
    }

    if (!startDate) {
      errors.startDate = 'Please enter start date';
    }

    if (projectType === 'fixed' && !endDate) {
      errors.endDate = 'Please enter end date';
    }

    if (teamMembers.length <= 0) {
      errors.teamMembers = 'Please select team members';
    }
    return errors;
  };

  const unselectMember = (id: number) => {
    const myArr = formData.teamMembers.filter((_) => _.id !== id);
    setFormData({ ...formData, teamMembers: myArr });
    setMember(null);
  };

  const reset = () => {
    setFormData({
      clientName: '',
      projectName: '',
      projectType: 'fixed',
      startDate: new Date(),
      endDate: null,
      billable: 'nonBillable',
      teamMembers: [],
    });
    setMember(null);
  };

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrMsg(fieldValidation());
    const notValid = fieldValidation();
    if (Object.values(notValid).length <= 0) {
      alert('Success');
      reset();
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
        Add a new project
      </Heading>
      <Box>
        <form onSubmit={formHandler}>
          <FormControl
            p='25px 0 10px'
            isInvalid={errMsg?.clientName ? true : false}
          >
            <FormLabel fontSize='14px' lineHeight='17.6px' fontWeight='600'>
              Select Client
            </FormLabel>
            <AutoCompleteElem onChange={selectClient} items={allClients} />
            <FormErrorMessage>{errMsg?.clientName}</FormErrorMessage>
          </FormControl>
          <FormControl p='8px 0' isInvalid={errMsg?.projectName ? true : false}>
            <FormLabel fontSize='14px' lineHeight='17.6px' fontWeight='600'>
              Project Name
            </FormLabel>
            <Input
              type='text'
              name='projectName'
              placeholder='Please enter project name'
              fontSize='14px'
              lineHeight='17.6px'
              onChange={inputHandler}
              value={formData.projectName}
            />
            <FormErrorMessage>{errMsg?.projectName}</FormErrorMessage>
          </FormControl>
          <FormControl p='8px 0'>
            <FormLabel fontSize='14px' lineHeight='17.6px' fontWeight='600'>
              Select project Type
            </FormLabel>
            <RadioGroup onChange={radioHandler} value={formData.projectType}>
              <Stack direction='row' alignItems='center'>
                <Radio value='fixed' variant='primary'>
                  <Text fontSize='14px' lineHeight='17.6px'>
                    Fixed
                  </Text>
                </Radio>
                <Radio value='retainer' variant='primary'>
                  <Text fontSize='14px' lineHeight='17.6px'>
                    Retainer
                  </Text>
                </Radio>
                <Radio value='retainer granular' variant='primary'>
                  <Text fontSize='14px' lineHeight='17.6px'>
                    Retainer (Granular)
                  </Text>
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <Flex justifyContent='space-between'>
            <FormControl
              p='8px 0'
              flexBasis='48%'
              isInvalid={errMsg?.startDate ? true : false}
            >
              <FormLabel
                fontSize='14px'
                lineHeight='17.6px'
                fontWeight='600'
                htmlFor='add_time'
              >
                Select date
              </FormLabel>
              <Flex
                alignItems='center'
                border='1px'
                borderColor='borderColor'
                rounded='md'
              >
                <Stack
                  w='30%'
                  alignItems='center'
                  p='10px 0'
                  bg='grayColor'
                  color='textLightMid'
                >
                  <AiOutlineCalendar fontSize='20px' />
                </Stack>
                <Box>
                  <DatePicker
                    selected={formData.startDate}
                    onChange={(date: Date) =>
                      setFormData({ ...formData, startDate: date })
                    }
                    placeholderText='mm/dd/yyyy'
                    className='date_picker_react'
                  />
                </Box>
              </Flex>
              <FormErrorMessage>{errMsg?.startDate}</FormErrorMessage>
            </FormControl>
            <FormControl
              p='8px 0'
              flexBasis='48%'
              isInvalid={errMsg?.endDate ? true : false}
            >
              <FormLabel
                fontSize='14px'
                lineHeight='17.6px'
                fontWeight='600'
                htmlFor='add_time'
              >
                {formData.projectType === 'fixed' ? (
                  <Text visibility='hidden'>Select date</Text>
                ) : (
                  'Month cycle (in days)'
                )}
              </FormLabel>
              {formData.projectType === 'fixed' ? (
                <Flex
                  alignItems='center'
                  border='1px'
                  borderColor='borderColor'
                  rounded='md'
                >
                  <Stack
                    w='30%'
                    alignItems='center'
                    p='10px 0'
                    bg='grayColor'
                    color='textLightMid'
                  >
                    <AiOutlineCalendar fontSize='20px' />
                  </Stack>
                  <Box>
                    <DatePicker
                      selected={formData.endDate}
                      onChange={(date: Date) =>
                        setFormData({ ...formData, endDate: date })
                      }
                      placeholderText='mm/dd/yyyy'
                      className='date_picker_react'
                    />
                  </Box>
                </Flex>
              ) : (
                <Text
                  p='8px 14px'
                  bg='grayMid'
                  fontSize='14px'
                  lineHeight='24px'
                  color='textLightMid'
                  rounded='md'
                >
                  Starts every 25th of the month
                </Text>
              )}
              <FormErrorMessage>{errMsg?.endDate}</FormErrorMessage>
            </FormControl>
          </Flex>
          <FormControl>
            <Checkbox onChange={checkboxHandler}>
              <Text fontSize='14px' color='textLightMid'>
                Billable
              </Text>
            </Checkbox>
          </FormControl>
          <FormControl
            p='20px 0 34px'
            isInvalid={errMsg?.teamMembers ? true : false}
          >
            <FormLabel
              fontSize='14px'
              lineHeight='17.6px'
              fontWeight='600'
              htmlFor='add_time'
            >
              Add project members
            </FormLabel>
            <AutoCompleteElem onChange={selectMember} items={items} />
            <AvatarGroup size='md' mt='15px' flexWrap='wrap' w='60%'>
              {formData.teamMembers.length > 0 &&
                formData.teamMembers.map((memberData, index) => (
                  <Avatar
                    key={memberData.id}
                    onClick={() => unselectMember(memberData.id)}
                    name={memberData.name}
                    cursor='pointer'
                  />
                ))}
            </AvatarGroup>
            <FormErrorMessage>{errMsg?.teamMembers}</FormErrorMessage>
          </FormControl>
          <Box>
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

export default NewProjectForm;
