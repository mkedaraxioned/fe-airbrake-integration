import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecurringProjectTasks from '../../components/recurringProjectTask';
import RecurringProjectArchive from '../../components/recurringProjectArchive';
import { ReactComponent as EditSvg } from '../../assets/images/edit.svg';
import { ReactComponent as ManageSvg } from '../../assets/images/manage.svg';
import { ReactComponent as ReportSvg } from '../../assets/images/report.svg';
import { useParams } from 'react-router';
import { _get } from '../../utils/api';
import NewProjectForm from '../../components/newProjectForm';

const ProjectTaskDetails = () => {
  const [projectData, setProjectData] = useState<any>();
  const { projectId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getProject();
  }, [projectId]);

  const getProject = async () => {
    try {
      if (projectId) {
        const res = await _get(`api/projects/${projectId}`);
        setProjectData(res.data.project);
      }
    } catch (error) {
      return error;
    }
  };

  const ModalBox = () => {
    return (
      <Drawer isOpen={isOpen} size='lg' placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent overflowY='scroll' w='588px !important'>
          <DrawerCloseButton zIndex='10' mt='10px' mr='10px' />
          <DrawerBody>
            <NewProjectForm onClose={onClose} projectId={projectId} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
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
            <Text>{projectData?.title}</Text>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent='space-between'>
          <Box>
            <Text
              fontSize='14px'
              color='textGray'
              textStyle='sourceSansProRegular'
              lineHeight='17.6px'
            >
              {projectData?.client.name}
            </Text>
            <Heading
              as='h2'
              m='0 !important'
              color='textColor'
              textStyle='sourceSansProBold'
              fontSize='22px'
              lineHeight='27.65px'
            >
              {projectData?.title}
            </Heading>
          </Box>
          <HStack>
            <Button w='137px' mr='10px' variant='secondary'>
              <Flex alignItems='center'>
                <ReportSvg />
                <Text pt='3px' pl='8px'>
                  View Report
                </Text>
              </Flex>
            </Button>
            <Button w='137px' variant='secondary' onClick={onOpen}>
              <Flex alignItems='center'>
                <EditSvg />
                <Text pt='3px' pl='8px'>
                  Edit Project
                </Text>
              </Flex>
            </Button>
            <Button w='137px' ml='18px !important' variant='primary'>
              <Link to={`/projects/${projectId}/manage`}>
                <Flex alignItems='center'>
                  <ManageSvg />
                  <Text pt='3px' pl='8px'>
                    {projectData?.type === 'FIXED'
                      ? 'Manage Phase'
                      : 'Manage Task'}
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
      <ModalBox />
    </Box>
  );
};

export default ProjectTaskDetails;
