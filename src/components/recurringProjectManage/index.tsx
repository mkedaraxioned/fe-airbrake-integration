import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  ListItem,
  StackDivider,
  Text,
  Tooltip,
  UnorderedList,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import CustomCheckbox from '../customCheckBox';
import { ReactComponent as DeleteSvg } from '../../assets/images/delete.svg';
import { ReactComponent as CheckSvg } from '../../assets/images/check.svg';
import { timeStringValidate } from '../../utils/validation';
import { _get, _patch, _post } from '../../utils/api';
import { useParams } from 'react-router';

export interface RecurringProjectError {
  milestoneEr?: string;
  taskEr?: string;
}

interface Err {
  budgetEr?: string;
  titleEr?: string;
  id?: number | null;
}

const RecurringProjectManage = () => {
  const [recurringFormData, setRecurringFormData] = useState<any>({
    tasks: [{ title: '', budget: '' }],
    milestone: [],
  });
  const [milestoneErr, setMilestoneErr] = useState<Err>({});
  const [taskErr, setTaskErr] = useState<Err>({});
  const [isVisibleIndex, setIsVisibleIndex] = useState<null | number>(null);
  const [taskIndex, setTaskIndex] = useState<null | number>(null);
  const { tasks, milestone } = recurringFormData;
  const { projectId } = useParams();
  const toast = useToast();
  const over = (index: number) => {
    setIsVisibleIndex(index);
  };
  const focusHandler = (index: number) => {
    setTaskIndex(index);
  };
  const blurHandler = () => {
    setTaskIndex(null);
  };
  const out = () => {
    setIsVisibleIndex(null);
  };

  const addTaskControls = () => {
    setRecurringFormData({
      ...recurringFormData,
      tasks: [...recurringFormData.tasks, { title: '', budget: '' }],
    });
  };
  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    if (projectId) {
      const res = await _get(`api/projects/${projectId}`);
      setRecurringFormData({
        milestone: res.data.project.milestones,
        tasks: res.data.project.tasks,
      });
    }
  };

  const removeTaskControls = async (id: string, taskIndex: number) => {
    const filterTask = recurringFormData.tasks.filter(
      (_: { title: string; budget: string }, index: number) =>
        index !== taskIndex,
    );
    setRecurringFormData({
      ...recurringFormData,
      tasks: filterTask,
    });
    if (id) {
      await _patch(`api/tasks/${id}`, { isDeleted: true });
      await fetchProject();
      toast({
        title: 'Task',
        description: 'Task Deleted.',
        status: 'success',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  const checkHandler = async (e: any, id: string) => {
    const archived = e.target.checked;
    if (id && archived) {
      await _patch(`api/tasks/${id}`, { isArchieved: true });
      await fetchProject();
      toast({
        title: 'Task',
        description: 'Task Archived successfully.',
        status: 'success',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value }: { name: string; value: string } = e.target;
    const list: any = [...recurringFormData.tasks];
    list[index][name] = value;
    setRecurringFormData({ ...recurringFormData, tasks: list });
    if (name === 'budget') {
      if (timeStringValidate(value)) {
        setTaskErr({ budgetEr: 'Please enter valid budget' });
      } else {
        setTaskErr({ budgetEr: '' });
      }
    }
  };

  const handleInputChangeMilestone = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value }: { name: string; value: string } = e.target;
    const mileStoneList: any = [...milestone];
    mileStoneList[index][name] = value;
    setRecurringFormData({ ...recurringFormData, milestone: mileStoneList });
    if (name === 'budget') {
      if (timeStringValidate(value)) {
        setMilestoneErr({ budgetEr: 'Please Enter valid budget', id: index });
      } else {
        setMilestoneErr({ budgetEr: '', id: null });
      }
    }
  };

  const fieldValidation = (title: string, budget: string) => {
    const errors: Err = {};
    if (!title) {
      errors.titleEr = 'Please enter milestone';
    }
    if (!budget || timeStringValidate(budget)) {
      errors.budgetEr = 'Please enter valid budget';
    }

    return errors;
  };

  const taskFieldValidation = (title: string, budget: string) => {
    const errors: Err = {};
    if (!title) {
      errors.titleEr = 'Please enter Task';
    }
    if (!budget || timeStringValidate(budget)) {
      errors.budgetEr = 'Please enter valid budget';
    }

    return errors;
  };

  const taskFormHandler = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string,
    title: any,
    budget: any,
    index: number,
  ) => {
    e.preventDefault();
    try {
      setTaskErr({ ...taskFieldValidation(title, budget), id: index });
      const notValid = fieldValidation(title, budget);
      if (id && Object.values(notValid).length <= 0) {
        await _patch(`api/tasks/${id}`, { projectId, title, budget });
      } else if (!id && Object.values(notValid).length <= 0) {
        await _post('api/tasks', { projectId, title, budget });
      } else {
        throw 'Milestone Not saved';
      }
      await fetchProject();
      toast({
        title: 'Task',
        description: 'Task successfully saved.',
        status: 'success',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Task',
        description: 'Task not saved.',
        status: 'error',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  const milestoneHandler = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string | undefined,
    title: string,
    budget: string,
    index: number,
  ) => {
    e.preventDefault();
    try {
      setMilestoneErr({ ...fieldValidation(title, budget), id: index });
      const notValid = fieldValidation(title, budget);
      if (id && Object.values(notValid).length <= 0) {
        await _patch(`api/milestones/${id}`, { title, budget });
        await fetchProject();
        toast({
          title: 'Milestone',
          description: 'Milestone successfully saved.',
          status: 'success',
          duration: 2000,
          position: 'top-right',
          isClosable: true,
        });
      } else {
        throw 'Milestone Not saved';
      }
    } catch (err) {
      toast({
        title: 'Milestone',
        description: 'Milestone not saved.',
        status: 'error',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  return (
    <HStack
      justifyContent='space-between'
      alignItems='flex-start'
      divider={<StackDivider />}
    >
      <Box p='22px 0'>
        <Flex
          justifyContent='space-between'
          color='grayLight'
          textStyle='sourceSansProBold'
          fontSize='14px'
          lineHeight='17.6px'
        >
          <Text>Month cycle - Milestone</Text>
          <Text>Total budget hrs (opt)</Text>
        </Flex>
        <Box pos='relative'>
          <UnorderedList m='0'>
            {milestone?.length > 0 &&
              milestone.map((_: any, index: any) => {
                return (
                  <form
                    key={index}
                    onSubmit={(e) =>
                      milestoneHandler(e, _.id, _.title, _.budget, index)
                    }
                  >
                    <ListItem m='20px 0' display='flex' alignItems='center'>
                      <Flex>
                        <FormControl
                          pos='relative'
                          isInvalid={
                            milestoneErr?.titleEr && milestoneErr?.id === index
                              ? true
                              : false
                          }
                        >
                          <Input
                            w='387px'
                            mr='32px'
                            textStyle='inputTextStyle'
                            type='text'
                            name='title'
                            value={_.title}
                            onChange={(e) =>
                              handleInputChangeMilestone(e, index)
                            }
                          />
                          {milestoneErr.id === index && (
                            <FormErrorMessage
                              pos='absolute'
                              width='192px'
                              bottom='-18px'
                              fontSize='12px'
                            >
                              {milestoneErr?.titleEr}
                            </FormErrorMessage>
                          )}
                        </FormControl>
                        <FormControl
                          w='114px'
                          pos='relative'
                          isInvalid={
                            milestoneErr?.budgetEr && milestoneErr?.id === index
                              ? true
                              : false
                          }
                        >
                          <Input
                            type='text'
                            textStyle='inputTextStyle'
                            value={_.budget}
                            name='budget'
                            onChange={(e) =>
                              handleInputChangeMilestone(e, index)
                            }
                            textAlign='center'
                          />
                          {milestoneErr.id === index && (
                            <FormErrorMessage
                              pos='absolute'
                              width='192px'
                              bottom='-18px'
                              fontSize='12px'
                            >
                              {milestoneErr?.budgetEr}
                            </FormErrorMessage>
                          )}
                        </FormControl>
                      </Flex>
                      <Tooltip label='Save'>
                        <Box pl='10px'>
                          <button type='submit'>
                            <CheckSvg />
                          </button>
                        </Box>
                      </Tooltip>
                    </ListItem>
                  </form>
                );
              })}
          </UnorderedList>
        </Box>
        <Text textStyle='inputTextStyle' textDecor='underline'>
          Load older entries
        </Text>
      </Box>
      <Box p='22px 0'>
        <Flex w='562px' justifyContent='space-between'>
          <HStack
            flexBasis='72%'
            color='grayLight'
            textStyle='sourceSansProBold'
            fontSize='14px'
            lineHeight='17.6px'
          >
            <Text m='0 !important'>Archive</Text>
            <Text pr='30%'>Task/Activity name</Text>
            <Text fontWeight='400' textDecor='underline'>
              View archive tasks
            </Text>
          </HStack>
          <HStack
            flexBasis='20%'
            justifyContent='space-between'
            color='grayLight'
            textStyle='sourceSansProBold'
            fontSize='14px'
            lineHeight='17.6px'
          >
            <Text>Budget Hrs</Text>
          </HStack>
        </Flex>
        <Box pos='relative'>
          <UnorderedList listStyleType='none' m='0'>
            {tasks?.map(
              (
                _: {
                  title: string;
                  budget: string;
                  id: string;
                  isDeleted: boolean;
                  isArchieved: boolean;
                },
                index: number,
              ) => {
                return (
                  !_.isDeleted &&
                  !_.isArchieved && (
                    <form
                      key={index}
                      onSubmit={(e) =>
                        taskFormHandler(e, _.id, _.title, _.budget, index)
                      }
                    >
                      <ListItem
                        m='20px 0'
                        onMouseOver={() => over(index)}
                        onMouseOut={out}
                      >
                        <HStack pos='relative'>
                          <Tooltip label='Archive'>
                            <Box p='0 15px 0 10px'>
                              <CustomCheckbox
                                onChange={(e: any) => checkHandler(e, _.id)}
                              />
                            </Box>
                          </Tooltip>
                          <FormControl
                            w='387px'
                            mr='20px'
                            isInvalid={
                              taskErr?.titleEr && taskErr?.id === index
                                ? true
                                : false
                            }
                          >
                            <Input
                              type='text'
                              textStyle='inputTextStyle'
                              placeholder='Enter Task'
                              value={_.title}
                              onFocus={() => focusHandler(index)}
                              onBlur={blurHandler}
                              name='title'
                              onChange={(e) => handleInputChange(e, index)}
                            />
                            {taskErr.id === index && (
                              <FormErrorMessage
                                pos='absolute'
                                width='192px'
                                bottom='-18px'
                                fontSize='12px'
                              >
                                {taskErr?.titleEr}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                          <FormControl
                            w='60px'
                            mr='10px !important'
                            isInvalid={
                              taskErr?.budgetEr && taskErr?.id === index
                                ? true
                                : false
                            }
                          >
                            <Input
                              type='text'
                              placeholder='Hrs'
                              textStyle='inputTextStyle'
                              value={_.budget}
                              name='budget'
                              onFocus={() => focusHandler(index)}
                              onBlur={blurHandler}
                              onChange={(e) => handleInputChange(e, index)}
                              textAlign='center'
                            />
                            {taskErr.id === index && (
                              <FormErrorMessage
                                pos='absolute'
                                width='192px'
                                bottom='-18px'
                                fontSize='12px'
                              >
                                {taskErr?.budgetEr}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                          <Tooltip label='Save'>
                            <Box
                              display={taskIndex === index ? 'block' : 'none'}
                              pl='10px'
                            >
                              <button type='submit'>
                                {' '}
                                <CheckSvg />
                              </button>
                            </Box>
                          </Tooltip>
                          <Tooltip label='Delete'>
                            <Box
                              display={
                                isVisibleIndex === index ? 'block' : 'none'
                              }
                              pos='absolute'
                              top='23%'
                              right='32px'
                              cursor='pointer'
                              onClick={() => removeTaskControls(_.id, index)}
                            >
                              <DeleteSvg />
                            </Box>
                          </Tooltip>
                        </HStack>
                      </ListItem>
                    </form>
                  )
                );
              },
            )}
          </UnorderedList>
        </Box>
        <Box
          pt='20px'
          display='flex'
          alignItems='center'
          textStyle='inputTextStyle'
          cursor='pointer'
        >
          <AiOutlinePlusCircle />
          <Text
            ml='5px'
            textStyle='inputTextStyle'
            onClick={addTaskControls}
            _hover={{
              textDecor: 'underline',
            }}
          >
            Add new task
          </Text>
        </Box>
      </Box>
    </HStack>
  );
};

export default RecurringProjectManage;
