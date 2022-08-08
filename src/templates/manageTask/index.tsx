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
import { ReactComponent as EditSvg } from '../../assets/images/edit.svg';
import { ReactComponent as ManageTaskSvg } from '../../assets/images/manage_task.svg';
import { useParams } from 'react-router';
import { _get } from '../../utils/api';
import FixedProjectManage from '../../components/fixedProjectManage';
import CreateMilestone from '../../components/createMilestone';
import RecurringProjectManage from '../../components/recurringProjectManage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ManageTask = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState<any>();

  const { projects } = useSelector((state: RootState) => state.allProjects);

  const project = projects?.find(({ id }: { id: string }) => id === projectId);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    const res = await _get(`api/projects/${projectId}`);
    setProjectData(res?.data.project);
  };

  const ModalBox = () => {
    return (
      <Drawer isOpen={isOpen} size='lg' placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent overflowY='scroll' w='588px !important'>
          <DrawerCloseButton zIndex='10' mt='10px' mr='10px' />
          <DrawerBody>
            {projectId && (
              <CreateMilestone
                onClose={onClose}
                name={project?.title}
                projectId={projectId}
              />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <Box>
      <Box p='15px 55px 80px' className='wrapper' textTransform='capitalize'>
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
          <BreadcrumbItem color='black'>
            <Link to={`/projects/${projectData?.id}/`}>
              {projectData?.title}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem color='textLight'>
            <Text>Manage</Text>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent='space-between'>
          <Box>
            <Text
              fontSize='14px'
              color='textGray'
              textStyle='sourceSansProRegular'
              lineHeight='17.6px'
              textAlign='left'
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
            {projectData?.type === 'FIXED' && (
              <Button w='170px' onClick={onOpen} variant='secondary'>
                <EditSvg />
                <Text pt='2px' pl='8px'>
                  Create Milestone
                </Text>
              </Button>
            )}
            <Box>
              <Button w='137px' margin='0 10px' variant='secondary'>
                <EditSvg />
                <Text pt='2px' pl='8px'>
                  Edit Project
                </Text>
              </Button>
            </Box>
            <Button
              type='submit'
              w={projectData?.type === 'FIXED' ? '147px' : '137px'}
              variant='primary'
            >
              <ManageTaskSvg />
              <Text pt='2px' pl='8px'>
                {projectData?.type === 'FIXED' ? 'Manage Phase' : 'Manage Task'}
              </Text>
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
          {projectData?.type === 'FIXED' ? (
            <FixedProjectManage />
          ) : (
            <RecurringProjectManage />
          )}
        </Box>
      </Box>
      <ModalBox />
    </Box>
  );
};

export default ManageTask;
