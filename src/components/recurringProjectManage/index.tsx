import {
  Box,
  Flex,
  FormControl,
  HStack,
  Input,
  ListItem,
  StackDivider,
  Text,
  UnorderedList,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import CustomCheckbox from '../customCheckBox';
import { ReactComponent as DeleteSvg } from '../../assets/images/delete.svg';
import { timeStringValidate } from '../../utils/validation';
import { _get, _patch } from '../../utils/api';
import { useParams } from 'react-router';

export interface RecurringProjectError {
  milestoneEr?: string;
  taskEr?: string;
}

interface Props {
  recurringProjectErr: any;
}

interface Err {
  budgetEr?: string;
  titleEr?: string;
  id?: number | null;
}

const RecurringProjectManage = ({ recurringProjectErr }: Props) => {
  const [recurringFormData, setRecurringFormData] = useState<any>({
    tasks: [{ title: '', hr: '' }],
    milestone: [],
  });
  const [milestoneErr, setMilestoneErr] = useState<Err>({});
  const [timeError, setTimeError] = useState('');
  const [budgetError, budgetTimeError] = useState('');
  const [isVisibleIndex, setIsVisibleIndex] = useState(0);
  const { tasks, milestone } = recurringFormData;
  const { projectId } = useParams();
  const toast = useToast();
  const over = (index: number) => {
    setIsVisibleIndex(index);
  };

  const out = () => {
    setIsVisibleIndex(0);
  };

  const addTaskControls = () => {
    setRecurringFormData({
      ...recurringFormData,
      tasks: [...recurringFormData.tasks, { title: '', hr: '' }],
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

  console.log(projectId, 'projectId');
  const removeTaskControls = (taskIndex: number) => {
    const filterTask = recurringFormData.tasks.filter(
      (_: { title: string; hr: string }, index: number) => index !== taskIndex,
    );
    setRecurringFormData({
      ...recurringFormData,
      tasks: filterTask,
    });
  };

  const checkHandler = (e: any): void => {
    console.log(e.target.checked, 'val');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value }: { name: string; value: string } = e.target;
    const list: any = [...recurringFormData.tasks];
    list[index][name] = value;
    setRecurringFormData({ ...recurringFormData, tasks: list });
    if (name === 'hr') {
      if (timeStringValidate(value)) {
        setTimeError('Please Enter valid time');
      } else {
        setTimeError('');
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
        setMilestoneErr({ budgetEr: 'Please Enter valid time', id: index });
      } else {
        setMilestoneErr({ budgetEr: '', id: null });
      }
    }
  };

  const milestoneValidation = (title: string, budget: string) => {
    const errors: Err = {};
    if (!title) {
      errors.titleEr = 'Please enter milestone';
    }
    if (!budget || timeStringValidate(budget)) {
      errors.budgetEr = 'Please enter valid milestone';
    }

    return errors;
  };
  console.log(milestoneErr, 'milestoneErr');

  const milestoneHandler = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string | undefined,
    title: string,
    budget: string,
    index: number,
  ) => {
    e.preventDefault();
    setMilestoneErr({ ...milestoneValidation(title, budget), id: index });
    e.preventDefault();
    try {
      setMilestoneErr({ ...milestoneValidation(title, budget), id: index });
      const notValid = milestoneValidation(title, budget);
      if (id && Object.values(notValid).length <= 0) {
        await _patch(`api/milestones/${id}`, { title, budget });
        fetchProject();
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
                console.log(_, '__');
                return (
                  <form
                    key={index}
                    onSubmit={(e) =>
                      milestoneHandler(e, _.id, _.title, _.budget, index)
                    }
                  >
                    <ListItem m='20px 0' display='flex' alignItems='center'>
                      <Input
                        w='387px'
                        mr='32px'
                        textStyle='inputTextStyle'
                        type='text'
                        name='title'
                        value={_.title}
                        onChange={(e) => handleInputChangeMilestone(e, index)}
                      />
                      <FormControl w='114px'>
                        <Input
                          type='text'
                          textStyle='inputTextStyle'
                          value={_.budget}
                          name='budget'
                          onChange={(e) => handleInputChangeMilestone(e, index)}
                          textAlign='center'
                        />
                      </FormControl>
                      <Box>
                        <button type='submit'>Save</button>
                      </Box>
                    </ListItem>
                  </form>
                );
              })}
          </UnorderedList>
          {recurringProjectErr.mileStoneEr && (
            <Text
              pos='absolute'
              bottom='-22px'
              color='#E53E3E'
              fontSize='14px'
              textStyle='sourceSansProRegular'
            >
              {recurringProjectErr.mileStoneEr}
            </Text>
          )}
          {budgetError && (
            <Text
              pos='absolute'
              right='0px'
              bottom='-22px'
              color='#E53E3E'
              fontSize='14px'
              textStyle='sourceSansProRegular'
            >
              {budgetError}
            </Text>
          )}
        </Box>
        <Text textStyle='inputTextStyle' textDecor='underline'>
          Load older entries
        </Text>
      </Box>
      <Box p='22px 0'>
        <Flex w='562px' justifyContent='space-between'>
          <HStack
            flexBasis='69%'
            justifyContent='space-between'
            color='grayLight'
            textStyle='sourceSansProBold'
            fontSize='14px'
            lineHeight='17.6px'
          >
            <Text>Task/Activity name</Text>
            <Text fontWeight='400' textDecor='underline'>
              View archive tasks
            </Text>
          </HStack>
          <HStack
            flexBasis='26%'
            justifyContent='space-between'
            color='grayLight'
            textStyle='sourceSansProBold'
            fontSize='14px'
            lineHeight='17.6px'
          >
            <Text>Budget Hrs</Text>
            <Text m='0 !important'>Archive</Text>
          </HStack>
        </Flex>
        <Box pos='relative'>
          <UnorderedList listStyleType='none' m='0'>
            {tasks?.map((_: { title: string; hr: string }, index: number) => {
              return (
                <ListItem
                  m='20px 0'
                  key={index}
                  onMouseOver={() => over(index)}
                  onMouseOut={out}
                >
                  <HStack pos='relative'>
                    <FormControl w='387px' mr='20px'>
                      <Input
                        type='text'
                        textStyle='inputTextStyle'
                        placeholder='Enter Task'
                        value={_.title}
                        name='title'
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </FormControl>
                    <FormControl w='60px' mr='37px !important'>
                      <Input
                        type='text'
                        placeholder='Hrs'
                        textStyle='inputTextStyle'
                        value={_.hr}
                        name='hr'
                        onChange={(e) => handleInputChange(e, index)}
                        textAlign='center'
                      />
                    </FormControl>
                    <Box>
                      <CustomCheckbox onChange={checkHandler} />
                    </Box>
                    {index === 0 ? null : (
                      <Box
                        display={isVisibleIndex === index ? 'block' : 'none'}
                        pos='absolute'
                        top='24%'
                        right='-10px'
                        cursor='pointer'
                        onClick={() => removeTaskControls(index)}
                      >
                        <DeleteSvg />
                      </Box>
                    )}
                  </HStack>
                </ListItem>
              );
            })}
          </UnorderedList>
          {recurringProjectErr.taskEr && (
            <Text
              pos='absolute'
              bottom='-22px'
              color='#E53E3E'
              fontSize='14px'
              textStyle='sourceSansProRegular'
            >
              {recurringProjectErr.taskEr}
            </Text>
          )}
          {timeError && (
            <Text
              pos='absolute'
              right='50px'
              bottom='-22px'
              color='#E53E3E'
              fontSize='14px'
              textStyle='sourceSansProRegular'
            >
              {timeError}
            </Text>
          )}
        </Box>
        <Box
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
