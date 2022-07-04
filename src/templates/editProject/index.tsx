import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  ListItem,
  StackDivider,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Task } from '../../interfaces/editProject';
import { ReactComponent as DeleteSvg } from '../../assets/images/delete.svg';
import CustomCheckbox from '../../components/customCheckBox';

const EditProject = () => {
  const [formData, setFormData] = useState<any>({
    task: [],
    milestone: [],
  });
  const [taskNode, setTaskNode] = useState<Task[]>([{ title: '', hr: '' }]);
  const [isVisibleIndex, setIsVisibleIndex] = useState(0);
  const over = (index: number) => {
    setIsVisibleIndex(index);
  };

  const out = () => {
    setIsVisibleIndex(0);
  };

  const addTaskControls = () => {
    setTaskNode([...taskNode, { title: '', hr: '' }]);
  };
  const removeTaskControls = (taskIndex: number) => {
    const filterTask = taskNode.filter((_, index) => index !== taskIndex);
    setTaskNode(filterTask);
  };

  const checkHandler = (e: any) => {
    console.log(e.target.checked, 'val');
  };

  const handleInputChange = (e: any, index: any) => {
    const { name, value } = e.target;
    const list: any = [...taskNode];
    list[index][name] = value;
    setTaskNode(list);
    setFormData({ ...formData, task: list });
  };
  return (
    <Box>
      <Box p='15px 55px 80px' className='wrapper'>
        <Breadcrumb
          m='15px 0'
          fontSize='14px'
          textStyle='sourceSansProRegular'
          spacing='4px'
        >
          <BreadcrumbItem color='textLight'>
            <Text color='black'>
              <Link to='/'>Home</Link>
            </Text>
          </BreadcrumbItem>
          <BreadcrumbItem color='textLight'>
            <Link to='/projects'>Projects</Link>
          </BreadcrumbItem>
          <BreadcrumbItem color='textLight'>
            <Text>Harvest</Text>
          </BreadcrumbItem>
          <BreadcrumbItem color='textLight'>
            <Text>Manage</Text>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent='space-between'>
          <VStack align='center' justifyContent='center'>
            <Text
              fontSize='14px'
              color='textGray'
              textStyle='sourceSansProRegular'
              lineHeight='17.6px'
            >
              Harvest
            </Text>
            <Heading
              as='h2'
              m='0 !important'
              color='textColor'
              textStyle='sourceSansProBold'
              fontSize='22px'
              lineHeight='27.65px'
            >
              123V
            </Heading>
          </VStack>
          <HStack>
            <Button w='137px' mr='10px' variant='secondary'>
              Edit Project
            </Button>
            <Button w='137px' ml='10px' variant='primary'>
              Manage
            </Button>
          </HStack>
        </Flex>
        <Box p='30px 0'>
          <Box pos='relative'>
            <Text
              color='textColor'
              textStyle='sourceSansProBold'
              fontSize='18px'
              lineHeight='22.63px'
            >
              Manage
            </Text>
          </Box>
          <HStack
            justifyContent='space-between'
            alignItems='flex-start'
            divider={<StackDivider />}
          >
            <Box h='77px' p='22px 0'>
              <Flex
                justifyContent='space-between'
                color='textLightMid'
                textStyle='sourceSansProBold'
                fontSize='14px'
                lineHeight='17.6px'
              >
                <Text>Month cycle - Milestone</Text>
                <Text>Total budget hrs (opt)</Text>
              </Flex>
              <UnorderedList m='0'>
                <ListItem m='20px 0' display='flex'>
                  <Input
                    w='387px'
                    mr='32px'
                    textStyle='inputTextStyle'
                    type='text'
                    value='Month(May 18 - Jun 17)'
                  />
                  <FormControl w='114px'>
                    <Input
                      type='text'
                      textStyle='inputTextStyle'
                      value={80}
                      textAlign='center'
                    />
                  </FormControl>
                </ListItem>
                <ListItem m='20px 0' display='flex'>
                  <Input
                    w='387px'
                    mr='32px'
                    textStyle='inputTextStyle'
                    type='text'
                    value='Month(May 18 - Jun 17)'
                  />
                  <FormControl w='114px'>
                    <Input
                      type='text'
                      textStyle='inputTextStyle'
                      value={80}
                      textAlign='center'
                    />
                  </FormControl>
                </ListItem>
                <ListItem m='20px 0' display='flex'>
                  <Input
                    w='387px'
                    mr='32px'
                    textStyle='inputTextStyle'
                    type='text'
                    value='Month(May 18 - Jun 17)'
                  />
                  <FormControl w='114px'>
                    <Input
                      type='text'
                      textStyle='inputTextStyle'
                      value={80}
                      textAlign='center'
                    />
                  </FormControl>
                </ListItem>
              </UnorderedList>
              <Text textStyle='inputTextStyle' textDecor='underline'>
                Load older entries
              </Text>
            </Box>
            <Box p='22px 0'>
              <Flex w='562px' justifyContent='space-between'>
                <HStack
                  flexBasis='69%'
                  justifyContent='space-between'
                  color='textLightMid'
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
                  color='textLightMid'
                  textStyle='sourceSansProBold'
                  fontSize='14px'
                  lineHeight='17.6px'
                >
                  <Text>Budget Hrs</Text>
                  <Text m='0 !important'>Archive</Text>
                </HStack>
              </Flex>
              <UnorderedList listStyleType='none' m='0'>
                {taskNode.map((_, index) => {
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
                            display={
                              isVisibleIndex === index ? 'block' : 'none'
                            }
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
        </Box>
      </Box>
    </Box>
  );
};

export default EditProject;
