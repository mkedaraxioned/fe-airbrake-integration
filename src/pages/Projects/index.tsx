import React, { useEffect, useState } from 'react';
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
  Select,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import NewProjectForm from '../../components/newProjectForm';
import { Link } from 'react-router-dom';
import TabsButton from '../../components/tabButton';
import ProjectList from '../../components/projectList';
import { _get } from '../../utils/api';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { ClientSet, utilClientName } from '../../utils/common';

const Projects = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clientSet, setClientSet] = useState<ClientSet[]>([]);
  const [myProjects, setMyProjects] = useState([]);
  const { projects } = useSelector((state: RootState) => state.allProjects);
  const { clients } = useSelector((state: RootState) => state.allClients);

  useEffect(() => {
    unqClients();
  }, [clients]);

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const fetchMyProjects = async () => {
    try {
      const res = await _get('api/projects/user');
      setMyProjects(res.data.projects);
    } catch (err) {
      return err;
    }
  };

  const unqClients = () => {
    if (clients) {
      const set: ClientSet[] = utilClientName(clients);
      const sortArr = set.sort((a: { name: string }, b: { name: string }) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
      );
      setClientSet(sortArr);
      console.log(sortArr, 'set');
    }
  };

  const ModalBox = () => {
    return (
      <Drawer isOpen={isOpen} size='lg' placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent overflowY='scroll' w='588px !important'>
          <DrawerCloseButton zIndex='10' mt='10px' mr='10px' />
          <DrawerBody>
            <NewProjectForm onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <Box>
      <Box p='15px 55px 80px' className='wrapper'>
        <Breadcrumb m='15px 0' fontSize='14px' spacing='4px'>
          <BreadcrumbItem>
            <Link to='/'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Text color='textLight'>Projects</Text>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent='space-between'>
          <Heading
            as='h2'
            color='textColor'
            fontSize='22px'
            textStyle='sourceSansProBold'
            lineHeight='27.65px'
          >
            Project list
          </Heading>
          <HStack>
            <Select
              mr='10px'
              placeholder='Select client'
              w='186px'
              color='textLightMid'
              fontSize='14px'
              textStyle='sourceSansProRegular'
            >
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
            <Select
              placeholder='Select project type'
              w='186px'
              color='textLightMid'
              fontSize='14px'
              textStyle='sourceSansProRegular'
            >
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
            <Box>
              <Button w='138px' ml='10px' variant='primary' onClick={onOpen}>
                New project
              </Button>
            </Box>
          </HStack>
        </Flex>
        <Tabs
          isLazy
          border='1px'
          mt='38px'
          borderColor='borderColor'
          rounded='md'
        >
          <TabList pb='2px' borderBottom='1px'>
            <TabsButton>My Projects</TabsButton>
            <TabsButton>All Projects</TabsButton>
          </TabList>
          <TabPanels>
            <TabPanel p='30px 22px'>
              {clientSet.length > 0 &&
                clientSet.map((client) => {
                  const projectPerClient = myProjects?.filter(
                    (project: { clientId: string }) =>
                      project.clientId === client.id,
                  );
                  return (
                    <ProjectList
                      key={client.id}
                      clientName={client.name}
                      projects={projectPerClient}
                    />
                  );
                })}
            </TabPanel>
            <TabPanel p='30px 22px'>
              {clientSet.length > 0 &&
                clientSet.map((client) => {
                  const projectPerClient = projects?.filter(
                    (project: { clientId: string }) =>
                      project.clientId === client.id,
                  );
                  return (
                    <ProjectList
                      key={client.id}
                      clientName={client.name}
                      projects={projectPerClient}
                    />
                  );
                })}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <ModalBox />
    </Box>
  );
};

export default Projects;
