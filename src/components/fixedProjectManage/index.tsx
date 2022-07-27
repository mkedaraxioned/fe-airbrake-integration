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
import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { ReactComponent as DeleteSvg } from '../../assets/images/delete.svg';
interface Phase {
  title: string;
  budget: string;
}

interface Props {
  fixedFormData: any;
  setFixedFormData: any;
}

const FixedProjectManage = ({ setFixedFormData }: Props) => {
  const [phaseNode, setPhaseNode] = useState<Phase[]>([
    { title: '', budget: '' },
  ]);

  const removePhaseControls = (phaseIndex: number) => {
    const filterPhase = phaseNode.filter((_, index) => index !== phaseIndex);
    setPhaseNode(filterPhase);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value }: { name: string; value: string } = e.target;
    const list: any = [...phaseNode];
    list[index][name] = value;
    setPhaseNode(list);
    setFixedFormData({ phase: list });
  };

  const addPhaseControls = () => {
    setPhaseNode([...phaseNode, { title: '', budget: '' }]);
  };

  return (
    <Box padding='15px 0'>
      <Flex w='562px' justifyContent='space-between'>
        <HStack
          flexBasis='69%'
          justifyContent='space-between'
          color='textLightMid'
          textStyle='sourceSansProBold'
          fontSize='14px'
          lineHeight='17.6px'
        >
          <Text>Milestones Name</Text>
        </HStack>
        <HStack
          flexBasis='26%'
          justifyContent='space-between'
          color='textLightMid'
          textStyle='sourceSansProBold'
          fontSize='14px'
          lineHeight='17.6px'
        >
          <Text>Budget Hrs</Text>
        </HStack>
      </Flex>
      <UnorderedList listStyleType='none' m='0'>
        {phaseNode.map((_, index) => {
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
        })}
      </UnorderedList>
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
    </Box>
  );
};

export default FixedProjectManage;
