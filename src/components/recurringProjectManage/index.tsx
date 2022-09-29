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
  UnorderedList,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ReactComponent as DeleteSvg } from '../../assets/images/deleteSVG.svg';
import { ReactComponent as CloseSvg } from '../../assets/images/closeSVG.svg';
import { ReactComponent as ArchiveSvg } from '../../assets/images/archiveSVG.svg';
import { ReactComponent as CheckGreySvg } from '../../assets/images/checkGray.svg';
import { ReactComponent as CheckGreenSvg } from '../../assets/images/checkSVG.svg';
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

const RecurringProjectManage = ({ projectType }: { projectType: string }) => {
  const [recurringFormData, setRecurringFormData] = useState<any>({
    tasks: [{ title: '', budget: '' }],
    milestone: [],
  });
  const [milestoneErr, setMilestoneErr] = useState<Err>({});
  const [taskErr, setTaskErr] = useState<Err>({});
  const [isVisibleIndex, setIsVisibleIndex] = useState<null | number>(null);
  const [taskIndex, setTaskIndex] = useState<null | number>(null);
  const [milestoneIndex, setMilestoneIndex] = useState<null | number>(null);
  const [showMilestoneCount, setShowMilestoneCount] = useState(6);
  const { tasks, milestone } = recurringFormData;
  const { projectId } = useParams();
  const toast = useToast();
  const over = (index: number) => {
    setIsVisibleIndex(index);
  };
  const focusHandler = (index: number) => {
    setTaskIndex(index);
  };

  const focusHandlerInput = (index: number) => {
    setMilestoneIndex(index);
  };

  const out = () => {
    setIsVisibleIndex(null);
  };

  useEffect(() => {
    fetchProject();
  }, []);
  const fetchProject = async () => {
    if (projectId) {
      const res = await _get(`api/projects/${projectId}`);
      setRecurringFormData({
        milestone: res.data.project.milestones,
        tasks: [...res.data.project.tasks, { title: '', budget: '' }],
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
    if (!budget) {
      return errors;
    } else if (timeStringValidate(budget)) {
      errors.budgetEr = 'Please enter valid milestone';
    }
    return errors;
  };

  const taskFieldValidation = (title: string, budget: string) => {
    const errors: Err = {};
    if (!title) {
      errors.titleEr = 'Please enter Task';
    }
    if (!budget) {
      errors.budgetEr = '';
    } else if (timeStringValidate(budget)) {
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
      setTaskIndex(null);
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
        setMilestoneIndex(null);
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
      alignItems='flex-start'
      justifyContent='space-between'
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
          <Text pr='8px'>Total budget hrs (opt)</Text>
        </Flex>
        <Box pos='relative'>
          <UnorderedList m='0'>
            {milestone?.length > 0 &&
              milestone.map((_: any, index: any) => {
                return (
                  index < showMilestoneCount && (
                    <form
                      key={index}
                      onSubmit={(e) =>
                        milestoneHandler(e, _.id, _.title, _.budget, index)
                      }
                    >
                      <ListItem m='20px 0' display='flex' alignItems='center'>
                        <Flex>
                          <FormControl
                            pr='20px'
                            pos='relative'
                            isInvalid={
                              milestoneErr?.titleEr &&
                              milestoneErr?.id === index
                                ? true
                                : false
                            }
                          >
                            <Input
                              w='387px'
                              textStyle='inputTextStyle'
                              type='text'
                              name='title'
                              value={_.title}
                              onFocus={() => focusHandlerInput(index)}
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
                            pos='relative'
                            isInvalid={
                              milestoneErr?.budgetEr &&
                              milestoneErr?.id === index
                                ? true
                                : false
                            }
                          >
                            <Input
                              w='80px'
                              type='text'
                              p='2px'
                              textStyle='inputTextStyle'
                              placeholder='Hrs'
                              value={_.budget}
                              onFocus={() => focusHandlerInput(index)}
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
                        {milestoneIndex !== index && index === 0 && (
                          <Box pl='10px'>
                            <button
                              type='submit'
                              disabled
                              className='not-allowed form-btn'
                            >
                              {' '}
                              <CheckGreySvg />
                            </button>
                          </Box>
                        )}
                        {milestoneIndex === index && (
                          <Flex alignItems='center'>
                            <Box
                              p='0 7px 0 10px'
                              display='flex'
                              title='Save'
                              alignItems='center'
                            >
                              <button type='submit' className='form-btn'>
                                {' '}
                                <CheckGreenSvg />
                              </button>
                            </Box>
                            <Box
                              display='flex'
                              alignItems='center'
                              title='Cancel'
                              cursor='pointer'
                              onClick={() => setMilestoneIndex(null)}
                            >
                              <CloseSvg />
                            </Box>
                          </Flex>
                        )}
                      </ListItem>
                    </form>
                  )
                );
              })}
          </UnorderedList>
        </Box>
        {milestone?.length > showMilestoneCount && (
          <Text
            textStyle='inputTextStyle'
            textDecor='underline'
            onClick={() => setShowMilestoneCount(milestone?.length)}
          >
            Load older entries
          </Text>
        )}
      </Box>
      {projectType === 'RETAINER_GRANULAR' && (
        <Box pt='22px' pb='22px'>
          <Flex w='562px' justifyContent='space-between'>
            <HStack
              flexBasis='58%'
              color='grayLight'
              textStyle='sourceSansProBold'
              fontSize='14px'
              lineHeight='17.6px'
            >
              <Text>Task/Activity name</Text>
            </HStack>
            <HStack
              flexBasis='27.2%'
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
                            <FormControl
                              w='387px'
                              mr='13px'
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
                              w='80px'
                              mr='3px !important'
                              isInvalid={
                                taskErr?.budgetEr && taskErr?.id === index
                                  ? true
                                  : false
                              }
                            >
                              <Input
                                p='0'
                                type='text'
                                placeholder='Hrs'
                                textStyle='inputTextStyle'
                                value={_.budget}
                                name='budget'
                                onFocus={() => focusHandler(index)}
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
                            {taskIndex !== index && index === tasks.length - 1 && (
                              <Box>
                                <button
                                  type='submit'
                                  disabled
                                  className='not-allowed form-btn'
                                >
                                  {' '}
                                  <CheckGreySvg />
                                </button>
                              </Box>
                            )}
                            {taskIndex === index && (
                              <Flex alignItems='center'>
                                <Box
                                  pr='7px'
                                  display='flex'
                                  title='Save'
                                  alignItems='center'
                                >
                                  <button type='submit' className='form-btn'>
                                    {' '}
                                    <CheckGreenSvg />
                                  </button>
                                </Box>
                                <Box
                                  cursor='pointer'
                                  title='Cancel'
                                  onClick={() => setTaskIndex(null)}
                                >
                                  <CloseSvg />
                                </Box>
                              </Flex>
                            )}
                            <Flex
                              display={
                                index !== 0 &&
                                isVisibleIndex === index &&
                                taskIndex !== index &&
                                tasks.length - 1 !== index
                                  ? 'flex'
                                  : 'none'
                              }
                            >
                              <Box
                                mr='7px'
                                cursor='pointer'
                                title='Archive'
                                onChange={(e: any) => checkHandler(e, _.id)}
                              >
                                <ArchiveSvg />
                              </Box>
                              <Box
                                title='Delete'
                                cursor='pointer'
                                onClick={() => removeTaskControls(_.id, index)}
                              >
                                <DeleteSvg />
                              </Box>
                            </Flex>
                          </HStack>
                        </ListItem>
                      </form>
                    )
                  );
                },
              )}
            </UnorderedList>
          </Box>
        </Box>
      )}
    </HStack>
  );
};

export default RecurringProjectManage;
