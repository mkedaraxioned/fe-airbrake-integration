import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Flex,
  Heading,
  HStack,
  SkeletonText,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecurringProjectTasks from '../../components/recurringProjectTask';
import { ReactComponent as ManageSvg } from '../../assets/images/manage.svg';
import { ReactComponent as ReportSvg } from '../../assets/images/report.svg';
import { useParams } from 'react-router';
import { _get } from '../../utils/api';

const ProjectTaskDetails = () => {
  const [, setLoading] = useState<boolean>(true);
  const [projectData, setProjectData] = useState<any>();
  const { projectId } = useParams();

  // TODO: invalidating tags pending, hence not using them
  // const { data, isLoading } = useGetSelectedProjectQuery(projectId);

  useEffect(() => {
    getProject();
  }, [projectId]);

  const getProject = async () => {
    try {
      if (projectId) {
        const res = await _get(`api/projects/${projectId}/report`);
        setProjectData(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <Box>
      <Box p='15px 55px' className='wrapper'>
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
              fontSize='14px'
              color='textGray'
              textStyle='sourceSansProRegular'
              lineHeight='17.6px'
            >
              {projectData?.clientName}
            </Text>
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
          </Box>
          <HStack>
            <Button w='137px' variant='secondary'>
              <Flex alignItems='center'>
                <ReportSvg />
                <Text pt='3px' pl='8px'>
                  View Report
                </Text>
              </Flex>
            </Button>
            <Link to={`/projects/${projectId}/manage`} title='Edit Milestone'>
              <Button w='150px' ml='10px !important' variant='primary'>
                <Flex alignItems='center'>
                  <ManageSvg />
                  <Text pl='8px'>Edit Milestone</Text>
                </Flex>
              </Button>
            </Link>
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
          {projectData && (
            <RecurringProjectTasks
              milestoneList={projectData?.milestones}
              projectType={projectData.projectType}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectTaskDetails;
