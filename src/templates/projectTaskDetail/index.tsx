import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import RecurringProjectTasks from '../../components/recurringProjectTask';
import RecurringProjectArchive from '../../components/recurringProjectArchive';
import { ReactComponent as EditSvg } from '../../assets/images/edit.svg';
import { ReactComponent as ManageSvg } from '../../assets/images/manage.svg';
import { ReactComponent as ReportSvg } from '../../assets/images/report.svg';

const ProjectTaskDetails = () => {
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
              <Flex alignItems='center'>
                <ReportSvg />
                <Text pt='3px' pl='8px'>
                  View Report
                </Text>
              </Flex>
            </Button>
            <Button w='137px' variant='secondary'>
              <Flex alignItems='center'>
                <EditSvg />
                <Text pt='3px' pl='8px'>
                  Edit Project
                </Text>
              </Flex>
            </Button>
            <Button w='137px' ml='18px !important' variant='primary'>
              <Link to='/projects/harvest/manage'>
                <Flex alignItems='center'>
                  <ManageSvg />
                  <Text pt='3px' pl='8px'>
                    Manage Task
                  </Text>
                </Flex>
              </Link>
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
