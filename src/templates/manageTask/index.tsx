import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { _get } from '../../utils/api';
import FixedProjectManage from '../../components/fixedProjectManage';
import RecurringProjectManage from '../../components/recurringProjectManage';
import { DrawerContainer } from '../../components/drawer';
import NewProjectForm from '../../components/newProjectForm';
import { ReactComponent as EditGreyIcon } from '../../assets/images/editGreyIcon.svg';

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

  return (
    <Box>
      <Box pt='15px' className='wrapper' textTransform='capitalize'>
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
        <Flex justifyContent='space-between' pr='35px'>
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
            <HStack spacing='12px'>
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
              <Text
                p='5px 8px'
                borderRadius='2px'
                bg='bgCard'
                fontSize='14px'
                color='textGray'
                textStyle='sourceSansProRegular'
                lineHeight='17.6px'
                textTransform='capitalize'
              >
                {projectData?.type === 'RETAINER_GRANULAR' &&
                  'Retainer Granular'}
                {projectData?.type === 'RETAINER' && 'Retainer'}
                {projectData?.type === 'FIXED' && 'Fixed'}
              </Text>
              <Button
                p='0'
                ml='2px'
                className='group'
                onClick={onOpen}
                bg='none'
                fontSize='14px'
                color='textGray'
                textStyle='sourceSansProRegular'
                lineHeight='17.6px'
                title='Edit Project'
                _hover={{ bg: 'white' }}
                transition='all 3s'
              >
                <EditGreyIcon />
                <Text
                  ml='5px'
                  textDecoration='none'
                  as='span'
                  _groupHover={{ textDecoration: 'underline' }}
                >
                  Edit Project
                </Text>
              </Button>
            </HStack>
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
      <DrawerContainer isOpen={isOpen} onClose={onClose}>
        <NewProjectForm onClose={onClose} projectId={projectId} />
      </DrawerContainer>
    </Box>
  );
};

export default ManageTask;
