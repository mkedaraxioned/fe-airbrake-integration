import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  ListItem,
  Text,
  UnorderedList,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ReactComponent as DeleteSvg } from '../../assets/images/deletetask.svg';
import { ReactComponent as CloseSvg } from '../../assets/images/xv2.svg';
import { ReactComponent as CheckGreenSvg } from '../../assets/images/checkv2.svg';
import { _get, _patch, _post } from '../../utils/api';
import { timeStringValidate } from '../../utils/validation';
import { decreaseItem, hoursToDecimal, removeItem } from '../../utils/common';
import { useNavigatingAway } from '../../hooks/useNavigatingAway';
import { DialogLeavingPage } from '../DialogLeavingPage';

export interface Phase {
  title: string;
  budget: string;
  projectId?: string;
}

export interface FixedProjectError {
  phaseEr?: string;
}
export interface FixedFormDataPhase {
  phase: Phase[];
}

interface Err {
  budgetEr?: string;
  titleEr?: string;
  id?: number | null;
}

const FixedProjectManage = () => {
  const [errMessage, setErrMessage] = useState<Err>({});
  const [fixedFormData, setFixedFormData] = useState<any>({
    phase: [],
  });
  const [tempData, setTempData] = useState<Phase[]>([]);
  const [milestoneIndex, setMilestoneIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number[]>([]);
  const [isVisibleIndex, setIsVisibleIndex] = useState<null | number>(null);
  const { projectId } = useParams();
  const toast = useToast();
  const [canShowDialogLeavingPage, setCanShowDialogLeavingPage] =
    useState<any>(false);
  const [showDialogLeavingPage, confirmNavigation, cancelNavigation] =
    useNavigatingAway(canShowDialogLeavingPage);

  useEffect(() => {
    fetchProject();
  }, []);

  useEffect(() => {
    console.log(editIndex.length);

    if (editIndex.length) {
      setCanShowDialogLeavingPage(true);
    } else {
      setCanShowDialogLeavingPage(false);
    }
  }, [editIndex]);

  const over = (index: number) => {
    setIsVisibleIndex(index);
  };

  const out = () => {
    setIsVisibleIndex(null);
  };

  const handleCancel = (index: number) => {
    const temp: Phase[] = tempData;
    const list: Phase[] = fixedFormData.phase;

    if (index <= temp.length - 1) {
      list[index]['title'] = temp[index]['title'];
      list[index]['budget'] = temp[index]['budget']
        ? hoursToDecimal(temp[index]['budget']).toFixed(2)
        : '';
      setEditIndex(removeItem(editIndex, index));
    }
    if (index >= temp.length) {
      list.splice(index, 1);
      setEditIndex(decreaseItem(editIndex, index, temp.length));
    }
    setMilestoneIndex(null);
    setFixedFormData({ phase: list });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value }: { name: string; value: string } = e.target;
    const list: any = [...fixedFormData.phase];
    if (editIndex.indexOf(index) < 0) {
      setEditIndex((editIndex) => [...editIndex, index]);
    }
    list[index][name] = value;
    if (value.length === 1 && list[list.length - 1]['title'] !== '') {
      setFixedFormData({
        ...fixedFormData,
        phase: [...list, { title: '', budget: '' }],
      });
    } else if (value === '' && list[list.length - 1]['title'] === '') {
      list.pop();
      setFixedFormData({ ...fixedFormData, phase: list });
    } else {
      setFixedFormData({ ...fixedFormData, phase: list });
    }
    if (name === 'budget') {
      if (timeStringValidate(value)) {
        setErrMessage({ budgetEr: 'Please Enter valid time', id: index });
      } else {
        setErrMessage({ budgetEr: '', id: null });
      }
    }
  };

  const fetchProject = async () => {
    const res = await _get(`api/projects/${projectId}`);
    const milestoneArray = res.data.project.milestones.map((mile: Phase) => ({
      ...mile,
      budget: mile.budget ? hoursToDecimal(mile.budget).toFixed(2) : '',
    }));
    setFixedFormData({
      phase: [...milestoneArray, { title: '', budget: '' }],
    });
    setTempData(res.data.project.milestones);
  };

  const fetchTempProject = async (index: number) => {
    const res = await _get(`api/projects/${projectId}`);
    const temp = res.data.project.milestones;
    setTempData(temp);
    const list: Phase[] = fixedFormData.phase;
    list[index]['budget'] = temp[index]['budget']
      ? hoursToDecimal(temp[index]['budget']).toFixed(2)
      : '';
    setFixedFormData({ phase: list });
  };

  const focusHandler = (index: number) => {
    setMilestoneIndex(index);
  };

  const removePhaseControls = async (
    id: string | undefined,
    phaseIndex: number,
  ) => {
    const filterPhase = fixedFormData.phase;
    filterPhase[phaseIndex]['isDeleted'] = true;
    setFixedFormData({ phase: filterPhase });
    if (id) {
      await _patch(`api/milestones/${id}`, { isDeleted: true });
    }
  };

  const milestoneValidation = (title: string, budget: string) => {
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

  const formHandler = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string | undefined,
    title: string,
    budget: string,
    index: number,
  ) => {
    e.preventDefault();
    try {
      setErrMessage({ ...milestoneValidation(title, budget), id: index });
      const notValid = milestoneValidation(title, budget);
      if (id && Object.values(notValid).length <= 0) {
        await _patch(`api/milestones/${id}`, { title, budget });
      } else if (!id && Object.values(notValid).length <= 0) {
        await _post('api/milestones', { projectId, title, budget });
      } else {
        throw 'Milestone Not saved';
      }
      toast({
        title: 'Milestone',
        description: 'Milestone successfully saved.',
        status: 'success',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
      fetchTempProject(index);
      setMilestoneIndex(null);
      setEditIndex(removeItem(editIndex, index));
    } catch (err) {
      err &&
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
    <Box padding='15px 0'>
      <DialogLeavingPage
        showDialog={showDialogLeavingPage}
        setShowDialog={setCanShowDialogLeavingPage}
        confirmNavigation={confirmNavigation}
        cancelNavigation={cancelNavigation}
      />
      <Flex w='562px' justifyContent='space-between'>
        <HStack
          flexBasis='69%'
          justifyContent='space-between'
          color='grayLight'
          textStyle='sourceSansProBold'
          fontSize='14px'
          lineHeight='17.6px'
        >
          <Text>Milestones Name</Text>
        </HStack>
        <HStack
          flexBasis='27%'
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
          {fixedFormData.phase.length > 0 &&
            fixedFormData.phase.map(
              (
                _: {
                  title: string;
                  budget: string;
                  id?: string;
                  isDeleted: boolean;
                },
                index: number,
              ) => {
                return (
                  !_.isDeleted && (
                    <ListItem
                      m='10px 0 18px'
                      key={index}
                      onMouseOver={() => over(index)}
                      onMouseOut={out}
                    >
                      <form
                        onSubmit={(e) =>
                          formHandler(e, _.id, _.title, _.budget, index)
                        }
                      >
                        <HStack pos='relative'>
                          <FormControl
                            pos='relative'
                            w='387px'
                            mr='12px'
                            isInvalid={
                              errMessage?.titleEr && errMessage?.id === index
                                ? true
                                : false
                            }
                          >
                            <Input
                              type='text'
                              textStyle='inputTextStyle'
                              placeholder='Enter Phase'
                              value={_.title}
                              name='title'
                              onFocus={() => focusHandler(index)}
                              onChange={(e) => handleInputChange(e, index)}
                            />
                            {errMessage.id === index && (
                              <FormErrorMessage
                                pos='absolute'
                                width='192px'
                                bottom='-18px'
                                fontSize='12px'
                              >
                                {errMessage?.titleEr}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                          <FormControl
                            w='80px'
                            pos='relative'
                            mr='5px !important'
                            isInvalid={
                              errMessage?.budgetEr && errMessage?.id === index
                                ? true
                                : false
                            }
                          >
                            <Input
                              type='text'
                              placeholder='Hrs'
                              p='2px'
                              textStyle='inputTextStyle'
                              value={_.budget}
                              name='budget'
                              onFocus={() => focusHandler(index)}
                              onChange={(e) => handleInputChange(e, index)}
                              textAlign='center'
                            />
                            {errMessage.id === index && (
                              <FormErrorMessage
                                pos='absolute'
                                width='192px'
                                bottom='-18px'
                                left='-40px'
                                fontSize='12px'
                              >
                                {errMessage?.budgetEr}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                          {editIndex.indexOf(index) > -1 && (
                            <Flex alignItems='center'>
                              <Box display='flex' pr='7px' title='Save'>
                                <button type='submit' className='form-btn'>
                                  {' '}
                                  <CheckGreenSvg />
                                </button>
                              </Box>
                              <Box
                                title='Cancel'
                                cursor='pointer'
                                onClick={() => handleCancel(index)}
                              >
                                <CloseSvg />
                              </Box>
                            </Flex>
                          )}
                          <Flex
                            display={
                              isVisibleIndex === index &&
                              milestoneIndex !== index &&
                              editIndex.indexOf(index) < 0 &&
                              fixedFormData.phase.length - 1 !== index
                                ? 'flex'
                                : 'none'
                            }
                          >
                            <Box
                              title='Delete'
                              cursor='pointer'
                              onClick={() => removePhaseControls(_.id, index)}
                            >
                              <DeleteSvg />
                            </Box>
                          </Flex>
                        </HStack>
                      </form>
                    </ListItem>
                  )
                );
              },
            )}
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default FixedProjectManage;
