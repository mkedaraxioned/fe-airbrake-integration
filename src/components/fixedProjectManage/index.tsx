import {
  Box,
  Flex,
  FormControl,
  HStack,
  Input,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { ReactComponent as DeleteSvg } from '../../assets/images/delete.svg';
import { timeStringValidate } from '../../utils/validation';

export interface Phase {
  title: string;
  budget: string;
}

export interface FixedProjectError {
  phaseEr?: string;
}
export interface FixedFormDataPhase {
  phase: Phase[];
}

interface Props {
  fixedFormData: FixedFormDataPhase;
  setFixedFormData: any;
  fixedProjectErr: FixedProjectError;
  setFixedProjectErr: any;
}

const FixedProjectManage = ({
  fixedFormData,
  fixedProjectErr,
  setFixedFormData,
  setFixedProjectErr,
}: Props) => {
  const removePhaseControls = (phaseIndex: number) => {
    const filterPhase = fixedFormData.phase?.filter(
      (_: { title: string; budget: string }, index: number) =>
        index !== phaseIndex,
    );
    setFixedFormData({ phase: filterPhase });
    setFixedProjectErr({ phaseEr: '' });
  };

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
        setFixedProjectErr({ phaseEr: 'Please Enter valid time' });
      } else {
        setFixedProjectErr({ phaseEr: '' });
      }
    }
  };

  const addPhaseControls = () => {
    setFixedFormData({
      phase: [...fixedFormData.phase, { title: '', budget: '' }],
    });
  };

  return (
    <Box padding='15px 0'>
      {fixedFormData.phase.length > 0 && (
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
      )}
      <Box pos='relative'>
        <UnorderedList listStyleType='none' m='0'>
          {fixedFormData.phase.map(
            (_: { title: string; budget: string }, index: number) => {
              return (
                <ListItem m='20px 0' key={index}>
                  <HStack pos='relative'>
                    <FormControl w='387px' mr='20px'>
                      <Input
                        type='text'
                        textStyle='inputTextStyle'
                        placeholder='Enter Phase'
                        value={_.title}
                        name='title'
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </FormControl>
                    <FormControl w='60px' mr='10px !important'>
                      <Input
                        type='text'
                        placeholder='Hrs'
                        textStyle='inputTextStyle'
                        value={_.budget}
                        name='budget'
                        onChange={(e) => handleInputChange(e, index)}
                        textAlign='center'
                      />
                    </FormControl>
                    <Box
                      cursor='pointer'
                      onClick={() => removePhaseControls(index)}
                    >
                      <DeleteSvg />
                    </Box>
                  </HStack>
                </ListItem>
              );
            },
          )}
        </UnorderedList>
        {fixedProjectErr.phaseEr && (
          <Text
            pos='absolute'
            bottom='-22px'
            color='#E53E3E'
            fontSize='14px'
            textStyle='sourceSansProRegular'
          >
            {fixedProjectErr.phaseEr}
          </Text>
        )}
      </Box>
      <Box
        pt='15px'
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
    </Box>
  );
};

export default FixedProjectManage;
