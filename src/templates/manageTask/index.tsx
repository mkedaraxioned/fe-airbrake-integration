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
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as EditSvg } from '../../assets/images/ProjectEdit.svg';
import { useParams } from 'react-router';
import { _get } from '../../utils/api';
import FixedProjectManage from '../../components/fixedProjectManage';
import RecurringProjectManage from '../../components/recurringProjectManage';

import NewProjectForm from '../../components/newProjectForm';

const ManageTask = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState<any>();

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
            <NewProjectForm onClose={onClose} projectId={projectId} />
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
          <Box>
            <Button
              w='137px'
              margin='0 10px'
              variant='secondary'
              onClick={onOpen}
              title='Edit Project'
            >
              <EditSvg />
              <Text pl='8px'>Edit Project</Text>
            </Button>
          </Box>
        </Flex>
        <Box p='8px 0'>
          {projectData?.type === 'FIXED' ? (
            <FixedProjectManage />
          ) : (
            <RecurringProjectManage projectType={projectData?.type} />
          )}
        </Box>
      </Box>
      <ModalBox />
    </Box>
  );
};

export default ManageTask;
