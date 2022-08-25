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
  Select,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import {
  Client,
  MemberObj,
  NewProjectFormData,
  NewProjectFormErr,
} from '../../interfaces/newProjectForm';
import './newProjectForm.modules.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AutoCompleteElem from '../autoComplete';
import CustomRadio from '../customRadio';
import { _get, _patch, _post } from '../../utils/api';
import { add, format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { allProjects } from '../../feature/projectsSlice';

interface Props {
  onClose: () => void;
  projectId?: string;
}

const NewProjectForm = ({ onClose, projectId }: Props) => {
  const [formData, setFormData] = useState<NewProjectFormData>({
    clientId: '',
    title: '',
    type: 'FIXED',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
    billingType: false,
    members: [],
  });
  const [errMsg, setErrMsg] = useState<NewProjectFormErr>();
  const [member, setMember] = useState<MemberObj | null>(null);
  const [allUsers, setAllUsers] = useState<any>([]);
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const [allClient, setAllClient] = useState<Client[]>([]);
  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    setMembers();
  }, [member]);

  useEffect(() => {
    fetchAllUser();
    fetchAllClients();
  }, []);

  useEffect(() => {
    fetchProject();
  }, []);

  useEffect(() => {
    setRetainerEndDate();
  }, [formData.type, formData.startDate]);

  const fetchAllUser = async () => {
    const res = await _get('api/users/all');
    setAllUsers(res.data.users);
  };

  const fetchAllClients = async () => {
    const res = await _get('api/clients/');
    const sortClient = res.data.clients.sort(
      (a: { name: string }, b: { name: string }) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
    );
    setAllClient(sortClient);
  };

  const fetchProject = async () => {
    if (projectId) {
      const res = await _get(`api/projects/${projectId}`);
      if (res.data) {
        setFormData({
          clientId: res.data.project.clientId,
          title: res.data.project.title,
          type: res.data.project.type,
          startDate: res.data.project.startDate,
          endDate: res.data.project.endDate,
          billingType: res.data.project.billingType,
          members: res.data.project.members,
        });
        setSelectedUsers(res.data.project.members);
      }
    }
  };

  const setRetainerEndDate = () => {
    const createdDate = add(new Date(formData.startDate as string), {
      months: 1,
    });
    if (formData.type !== 'FIXED') {
      setFormData({
        ...formData,
        endDate: format(new Date(createdDate), 'yyyy-MM-dd'),
      });
    }
  };
  const fetchProjects = async () => {
    const projectsRes = await _get('api/projects');
    dispatch(allProjects(projectsRes.data?.projects));
  };

  const selecttHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? setFormData({ ...formData, billingType: true })
      : setFormData({ ...formData, billingType: false });
  };
  const radioHandler = (e: any) => {
    setFormData({ ...formData, type: e.target.value });
  };
  const selectMember = (item: MemberObj) => {
    setMember(item);
  };
  const setMembers = () => {
    const arr = formData.members?.map((val) => val.id);
    const user = allUsers?.filter((ele: any) => ele.id == member?.id);
    if (!member) return null;
    if (!arr.includes(member.id)) {
      setFormData({
        ...formData,
        members: [...formData.members, user[0]],
      });
      setSelectedUsers([...selectedUsers, member]);
      setErrMsg({ ...errMsg, members: '' });
      setMember(null);
    } else {
      setErrMsg({ ...errMsg, members: 'Team member already added' });
    }
  };
  const fieldValidation = () => {
    const errors: NewProjectFormErr = {};
    const { clientId, title, startDate, endDate, type, members } = formData;

    if (!clientId) {
      errors.client = 'Please select client.';
    }
    if (!title) {
      errors.title = 'Please enter project name. ';
    }

    if (!startDate) {
      errors.startDate = 'Please enter start date';
    }

    if (type === 'FIXED' && !endDate) {
      errors.endDate = 'Please enter end date';
    }

    if (members.length <= 0) {
      errors.members = 'Please select team members';
    }
    return errors;
  };
  const unselectMember = (id: number) => {
    const myArr = formData.members.filter((_) => _.id !== id);
    const userArr = selectedUsers.filter((_: any) => _.id !== id);
    setFormData({ ...formData, members: myArr });
    setSelectedUsers(userArr);
    setMember(null);
  };

  const reset = () => {
    setFormData({
      clientId: '',
      title: '',
      type: 'FIXED',
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: null,
      billingType: false,
      members: [],
    });
    setMember(null);
    setSelectedUsers([]);
  };

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setErrMsg(fieldValidation());
      const notValid = fieldValidation();
      if (Object.values(notValid).length <= 0) {
        if (projectId) {
          await _patch(`api/projects/${projectId}`, {
            ...formData,
            tasks: [],
            milestones: [],
          });
        } else {
          await _post('api/projects/', formData);
        }
        onClose();
        reset();
        fetchProjects();
        toast({
          title: 'Project',
          description: 'New project created successfully.',
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
          description: 'Project not created.',
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
        color='textColor'
      >
        Add a new project
      </Heading>
      <Box>
        <form onSubmit={formHandler}>
          <FormControl
            p='25px 0 10px'
            isInvalid={errMsg?.client ? true : false}
            opacity={projectId ? '.3' : '1'}
            pointerEvents={projectId ? 'none' : 'auto'}
          >
            <FormLabel fontSize='14px' lineHeight='17.6px' fontWeight='600'>
              Select client
            </FormLabel>
            <Select
              id='select_project'
              name='clientId'
              value={formData.clientId}
              placeholder='Please select client'
              fontSize='14px'
              lineHeight='17.6px'
              color='grayLight'
              textStyle='sourceSansProRegular'
              onChange={selecttHandler}
            >
              {allClient?.length > 0 &&
                allClient?.map((client: Client) => {
                  return (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  );
                })}
            </Select>
            <FormErrorMessage>{errMsg?.client}</FormErrorMessage>
          </FormControl>
          <FormControl p='8px 0' isInvalid={errMsg?.title ? true : false}>
            <FormLabel fontSize='14px' lineHeight='17.6px' fontWeight='600'>
              Project name
            </FormLabel>
            <Input
              type='text'
              name='title'
              placeholder='Please enter project name'
              fontSize='14px'
              color='extraLightBlack'
              lineHeight='17.6px'
              onChange={inputHandler}
              value={formData.title}
            />
            <FormErrorMessage>{errMsg?.title}</FormErrorMessage>
          </FormControl>
          <FormControl
            p='8px 0'
            opacity={projectId ? '.3' : '1'}
            pointerEvents={projectId ? 'none' : 'auto'}
            color='extraLightBlack'
          >
            <FormLabel fontSize='14px' lineHeight='17.6px' fontWeight='600'>
              Select project type
            </FormLabel>
            <Flex>
              <Box mr='20px'>
                <CustomRadio
                  onChange={radioHandler}
                  lable='Fixed'
                  value='FIXED'
                  isChecked={formData.type === 'FIXED' ? true : false}
                />
              </Box>
              <Box mr='20px'>
                <CustomRadio
                  onChange={radioHandler}
                  lable='Retainer'
                  value='RETAINER'
                  isChecked={formData.type === 'RETAINER' ? true : false}
                />
              </Box>
              <Box>
                <CustomRadio
                  onChange={radioHandler}
                  lable='Retainer (granular)'
                  value='RETAINER_GRANULAR'
                  isChecked={
                    formData.type === 'RETAINER_GRANULAR' ? true : false
                  }
                />
              </Box>
            </Flex>
          </FormControl>
          <Flex
            justifyContent='space-between'
            opacity={projectId ? '.3' : '1'}
            pointerEvents={projectId ? 'none' : 'auto'}
          >
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
                  color='grayLight'
                >
                  <AiOutlineCalendar fontSize='20px' />
                </Stack>
                <Box>
                  <DatePicker
                    selected={new Date(formData.startDate as string)}
                    onChange={(date: Date) =>
                      setFormData({
                        ...formData,
                        startDate: format(new Date(date), 'yyyy-MM-dd'),
                      })
                    }
                    placeholderText='MM/DD/YYYY'
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
                {formData.type === 'FIXED' ? (
                  <Text visibility='hidden'>Select date</Text>
                ) : (
                  'Month cycle (in days)'
                )}
              </FormLabel>
              {formData.type === 'FIXED' ? (
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
                    color='grayLight'
                  >
                    <AiOutlineCalendar fontSize='20px' />
                  </Stack>
                  <Box>
                    <DatePicker
                      selected={new Date(formData.endDate as string)}
                      onChange={(date: Date) =>
                        setFormData({
                          ...formData,
                          endDate: format(new Date(date), 'yyyy-MM-dd'),
                        })
                      }
                      placeholderText='MM/DD/YYYY'
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
                  color='grayLight'
                  rounded='md'
                >
                  Starts every{' '}
                  {format(new Date(formData.endDate as string), 'do')} of the
                  month
                </Text>
              )}
              <FormErrorMessage>{errMsg?.endDate}</FormErrorMessage>
            </FormControl>
          </Flex>
          <FormControl>
            <Checkbox
              onChange={checkboxHandler}
              _checked={{
                '.chakra-checkbox__control': {
                  backgroundColor: 'btnPurple',
                  border: 'none',
                },
              }}
            >
              <Text fontSize='14px' color='grayLight'>
                Billable
              </Text>
            </Checkbox>
          </FormControl>
          <FormControl
            p='20px 0 34px'
            isInvalid={errMsg?.members ? true : false}
          >
            <FormLabel
              fontSize='14px'
              lineHeight='17.6px'
              fontWeight='600'
              htmlFor='add_time'
            >
              Add project members
            </FormLabel>
            <AutoCompleteElem
              onChange={selectMember}
              items={allUsers}
              placeholder={'Select members from the list'}
            />
            <AvatarGroup mt='15px' flexWrap='wrap' w='60%'>
              {selectedUsers.length > 0 &&
                selectedUsers.map((memberData: any) => {
                  return (
                    <Avatar
                      w='32px'
                      h='32px'
                      size='32px'
                      key={memberData.id}
                      src={memberData.avatar}
                      onClick={() => unselectMember(memberData.id)}
                      name={memberData.name}
                      cursor='pointer'
                    />
                  );
                })}
            </AvatarGroup>
            <FormErrorMessage>{errMsg?.members}</FormErrorMessage>
          </FormControl>
          <Box>
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

export default NewProjectForm;
