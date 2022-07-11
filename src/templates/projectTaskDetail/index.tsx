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
import RecurringProjectTasks from '../../components/recurringProjectTask';
import RecurringProjectArchive from '../../components/recurringProjectArchive';

const ProjectTaskDetails = () => {
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

  const checkHandler = (e: any): void => {
    console.log(e.target.checked, 'val');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value }: { name: string; value: string } = e.target;
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
          <BreadcrumbItem color='black'>
            <Link to='/'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem color='black'>
            <Link to='/projects'>Projects</Link>
          </BreadcrumbItem>
          <BreadcrumbItem color='textLight'>
            <Text>Harvest</Text>
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
              <Link to='/projects/harvest/manage'>Manage</Link>
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
              Task details
            </Text>
          </Box>
          <RecurringProjectTasks />
          <Box>
            <Text
              color='textColor'
              textStyle='sourceSansProBold'
              fontSize='18px'
              lineHeight='22.63px'
            >
              Archived tasks (1)
            </Text>
          </Box>
          <RecurringProjectArchive />
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectTaskDetails;
