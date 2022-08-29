import React, { useEffect, useState } from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import NewProjectForm from '../../components/newProjectForm';
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import ProjectList from '../../components/projectList';
import { _get } from '../../utils/api';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { ClientSet, utilClientName } from '../../utils/common';
import AutoCompleteElem from '../../components/autoComplete';

const Projects = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clientSet, setClientSet] = useState<ClientSet[]>([]);
  const [myProjects, setMyProjects] = useState([]);
  const { projects } = useSelector((state: RootState) => state.allProjects);
  const { clients } = useSelector((state: RootState) => state.allClients);
  const user = useSelector((state: RootState) => state.user);
  const [checked, setChecked] = useState(true);
  const [type, setType] = useState('');
  const [filterVar, setFilterVar] = useState({ checked: 'true' });
  const [filterPro, setFilterPro] = useState([]);
  const [filterClient, setFilterClient] = useState<ClientSet[]>([]);
  const [selectClient, setSelectClient] = useState('');

  useEffect(() => {
    unqClients();
  }, [clients]);

  useEffect(() => {
    fetchMyProjects();
  }, []);

  useEffect(() => {
    if (checked) {
      setFilterPro(myProjects);
    } else {
      setFilterPro(projects);
    }
  }, [checked, myProjects]);

  useEffect(() => {
    if (clientSet.length > 0) {
      if (selectClient === '') {
        setFilterClient(clientSet);
      } else {
        const selected = clientSet?.filter(
          (client) => client?.id === selectClient,
        );
        setFilterClient(selected);
      }
    }
  }, [clientSet, selectClient]);

  const handleCheck = () => {
    setChecked(!checked);
    setFilterVar({ ...filterVar, checked: `${!checked}` });
    navigate({
      pathname: '/projects',
      search: `?${createSearchParams({
        ...filterVar,
        checked: `${!checked}`,
      })}`,
    });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value === 'none') {
      setType('');
    } else {
      setType(e.currentTarget.value);
    }
  };

  const handleInput = (ele: any) => {
    console.log(ele, 'ele');

    if (!ele) {
      setSelectClient('');
    } else {
      setSelectClient(ele.id);
    }
  };

  const fetchMyProjects = async () => {
    try {
      const res = await _get('api/users/projects');
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
          <HStack spacing='20px'>
            <Checkbox
              fontSize='14px'
              isChecked={checked}
              onChange={handleCheck}
              isDisabled={user.profile.role === 'ADMIN' ? false : true}
            >
              <Text as='span' color='grayLight' fontSize='14px'>
                My Projects
              </Text>
            </Checkbox>
            <Box w='186px'>
              <AutoCompleteElem
                onChange={(ele: any) => handleInput(ele)}
                items={clients}
                placeholder={'Search client'}
              />
            </Box>
            <Select
              w='186px'
              color='grayLight'
              fontSize='14px'
              textStyle='sourceSansProRegular'
              onChange={(e) => handleSelect(e)}
            >
              <option value='none'>Select project type</option>
              <option value='FIXED'>Fixed</option>
              <option value='RETAINER_GRANULAR'>Retainer Granular</option>
              <option value='RETAINER'>Retainer</option>
            </Select>
            <Box>
              <Button w='138px' variant='primary' onClick={onOpen}>
                New project
              </Button>
            </Box>
          </HStack>
        </Flex>
        <Box p='30px 22px'>
          {filterClient?.length > 0 &&
            filterClient?.map((client) => {
              const projectPerClient = filterPro?.filter(
                (project: { clientId: string }) =>
                  project.clientId === client.id,
              );
              return (
                <ProjectList
                  key={client.id}
                  clientName={client.name}
                  projects={projectPerClient}
                  type={type}
                />
              );
            })}
        </Box>
      </Box>
      <ModalBox />
    </Box>
  );
};

export default Projects;
