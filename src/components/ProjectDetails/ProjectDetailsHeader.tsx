import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react';
import { format, lastDayOfWeek, startOfWeek } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as ManageSvg } from '../../assets/images/manage.svg';
import { ReactComponent as ReportSvg } from '../../assets/images/report.svg';
import { RootState } from '../../redux';

interface Props {
  projectName: string | undefined;
  clientName: string | undefined;
  projectId: string | undefined;
}
const ProjectDetailsHeader = ({
  projectName,
  clientName,
  projectId,
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
            fontSize='14px'
            color='textGray'
            textStyle='sourceSansProRegular'
            lineHeight='17.6px'
          >
            {clientName}
          </Text>
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
            <Button w='150px' ml='10px !important' variant='primary'>
              <Flex alignItems='center'>
                <ManageSvg />
                <Text pl='8px'>Edit Milestone</Text>
              </Flex>
            </Button>
          </Link>
        </HStack>
      </Flex>
    </>
  );
};

export default ProjectDetailsHeader;
