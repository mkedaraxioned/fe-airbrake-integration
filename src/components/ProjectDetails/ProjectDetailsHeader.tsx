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
import { format, lastDayOfWeek, startOfWeek } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as EditGreyIcon } from '../../assets/images/editGreyIcon.svg';
import { ReactComponent as ManageSvg } from '../../assets/images/manage.svg';
import { ReactComponent as ReportSvg } from '../../assets/images/report.svg';
import { RootState } from '../../redux';
import { DrawerContainer } from '../drawer';
import NewProjectForm from '../newProjectForm';

interface Props {
  projectName: string | undefined;
  clientName: string | undefined;
  projectId: string | undefined;
  projectType: string | undefined;
}
const ProjectDetailsHeader = ({
  projectName,
  clientName,
  projectId,
  projectType,
}: Props) => {
  const {
    allClients: { clients },
  } = useSelector((state: RootState) => state.rootSlices);
  const thisWeekFirstDate = format(startOfWeek(new Date()), 'yyyy-MM-dd');
  const thisWeekLastDate = format(lastDayOfWeek(new Date()), 'yyyy-MM-dd');

  const { id: clientId } = clients.find((client: { projects: string[] }) => {
    return client.projects.find((project: any) => project.id === projectId);
  });

  const reportURL = `/reports?startDate=${thisWeekFirstDate}&endDate=${thisWeekLastDate}&groupBy=client&billableType=&clientId=${clientId}&userId=&projectId=${projectId}`;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
          <Text>{projectName}</Text>
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
            {clientName}
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
              {projectName}
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
              {projectType === 'RETAINER_GRANULAR'
                ? 'Retainer Granular'
                : projectType?.toLowerCase()}
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
          <Link to={reportURL} title='View Report'>
            <Button w='137px' variant='secondary'>
              <Flex alignItems='center'>
                <ReportSvg />
                <Text pt='3px' pl='8px'>
                  View Report
                </Text>
              </Flex>
            </Button>
          </Link>
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
      <DrawerContainer isOpen={isOpen} onClose={onClose}>
        <NewProjectForm onClose={onClose} projectId={projectId} />
      </DrawerContainer>
    </>
  );
};

export default ProjectDetailsHeader;
