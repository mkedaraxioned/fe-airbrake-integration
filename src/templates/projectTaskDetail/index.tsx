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
import RecurringProjectTasks from '../../components/recurringProjectTask';
import { ReactComponent as ManageSvg } from '../../assets/images/manage.svg';
import { ReactComponent as ReportSvg } from '../../assets/images/report.svg';
import { ReactComponent as EditGreyIcon } from '../../assets/images/editGreyIcon.svg';
import { useParams } from 'react-router';
import { _get } from '../../utils/api';
import { DrawerContainer } from '../../components/drawer';
import NewProjectForm from '../../components/newProjectForm';

const ProjectTaskDetails = () => {
  const [, setLoading] = useState<boolean>(true);
  const [projectData, setProjectData] = useState<any>();
  const { projectId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO: invalidating tags pending, hence not using them
  // const { data, isLoading } = useGetSelectedProjectQuery(projectId);

  useEffect(() => {
    getProject();
  }, [projectId]);

  const getProject = async () => {
    try {
      if (projectId) {
        const res = await _get(`api/projects/${projectId}/report`);
        if (res.data.data.projectType === 'RETAINER_GRANULAR') {
          const res = await _get(`api/projects/${projectId}/granular/report`);
          setProjectData(res.data.data);
          setLoading(false);
        } else {
          setProjectData(res.data.data);
          setLoading(false);
        }
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <Box>
      <Box p='15px 0' className='wrapper'>
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
            <Text>{projectData?.projectName}</Text>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent='space-between'>
          <Box>
            <Text
              fontSize='16px'
              color='textGray'
              textStyle='sourceSansProRegular'
              lineHeight='17.6px'
            >
              {projectData?.clientName}
            </Text>
            <HStack alignItems='center' spacing='12px'>
              <Heading
                as='h2'
                m='0 !important'
                color='textColor'
                textStyle='sourceSansProBold'
                fontSize='22px'
                lineHeight='27.65px'
              >
                {projectData?.projectName}
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
                {projectData?.projectType === 'RETAINER_GRANULAR' &&
                  'Retainer Granular'}
                {projectData?.projectType === 'RETAINER' && 'Retainer'}
                {projectData?.projectType === 'FIXED' && 'Fixed'}
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
          <HStack>
            <Button w='137px' variant='secondary' fontSize='14px'>
              <Flex alignItems='center'>
                <ReportSvg />
                <Text pt='3px' pl='8px'>
                  View Report
                </Text>
              </Flex>
            </Button>
            <Link to={`/projects/${projectId}/manage`} title='Edit Milestone'>
              <Button
                w='150px'
                ml='10px !important'
                variant='primary'
                fontSize='14px'
              >
                <Flex alignItems='center'>
                  <ManageSvg />
                  <Text pl='8px'>Edit Milestone</Text>
                </Flex>
              </Button>
            </Link>
          </HStack>
        </Flex>
        <Box p='14px 0'>
          <Box pos='relative'>
            <Text
              color='textColor'
              textStyle='sourceSansProBold'
              fontSize='18px'
              lineHeight='22.63px'
            >
              Milestone details
            </Text>
          </Box>
          {projectData && (
            <RecurringProjectTasks
              milestoneList={projectData?.milestones || projectData?.tasks}
              projectType={projectData.projectType}
            />
          )}
        </Box>
      </Box>
      <DrawerContainer isOpen={isOpen} onClose={onClose}>
        <NewProjectForm onClose={onClose} projectId={projectId} />
      </DrawerContainer>
    </Box>
  );
};

export default ProjectTaskDetails;
