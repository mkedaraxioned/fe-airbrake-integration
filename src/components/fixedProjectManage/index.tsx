import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  ListItem,
  Text,
  Tooltip,
  UnorderedList,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useParams } from 'react-router';
import { ReactComponent as DeleteSvg } from '../../assets/images/delete.svg';
import { ReactComponent as CheckSvg } from '../../assets/images/check.svg';
import { _get, _patch, _post } from '../../utils/api';
import { timeStringValidate } from '../../utils/validation';

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
  const [milestoneIndex, setMilestoneIndex] = useState<null | number>(null);

  const { projectId } = useParams();
  const toast = useToast();

  useEffect(() => {
    fetchProject();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value }: { name: string; value: string } = e.target;
    const list: any = [...fixedFormData.phase];
    list[index][name] = value;
    setFixedFormData({ phase: list });
    setFixedFormData({ ...fixedFormData, phase: list });
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
    setFixedFormData({ phase: [...res.data.project.milestones] });
  };

  const addPhaseControls = () => {
    setFixedFormData({
      phase: [{ title: '', budget: '' }, ...fixedFormData.phase],
    });
  };

  const focusHandler = (index: number) => {
    setMilestoneIndex(index);
  };

  const removePhaseControls = async (
    id: string | undefined,
    phaseIndex: number,
  ) => {
    const filterPhase = fixedFormData.phase?.filter(
      (_: { title: string; budget: string }, index: number) =>
        index !== phaseIndex,
    );
    setFixedFormData({ phase: filterPhase });
    if (id) {
      await _patch(`api/milestones/${id}`, { isDeleted: true });
      await fetchProject();
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
              onClick={addPhaseControls}
              _hover={{
                textDecor: 'underline',
              }}
            >
              Add new Phase
            </Text>
          </Box>
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
                    <ListItem m='10px 0 18px' key={index}>
                      <form
                        onSubmit={(e) =>
                          formHandler(e, _.id, _.title, _.budget, index)
                        }
                      >
                        <HStack pos='relative'>
                          <FormControl
                            pos='relative'
                            w='387px'
                            mr='20px'
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
                            w='60px'
                            pos='relative'
                            mr='10px !important'
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
                          {milestoneIndex === index && (
                            <Flex alignItems='center'>
                              <Tooltip label='Delete'>
                                <Box
                                  pr='10px'
                                  cursor='pointer'
                                  onClick={() =>
                                    removePhaseControls(_.id, index)
                                  }
                                >
                                  <DeleteSvg />
                                </Box>
                              </Tooltip>
                              <Tooltip label='Save'>
                                <button type='submit'>
                                  <CheckSvg />
                                </button>
                              </Tooltip>
                            </Flex>
                          )}
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
