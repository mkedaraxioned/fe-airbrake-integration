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
  Input,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import NewProjectForm from '../../components/newProjectForm';
import { Link, useSearchParams } from 'react-router-dom';
import ProjectList from '../../components/projectList';
import { _get } from '../../utils/api';
import { RootState } from '../../redux';
import { useSelector } from 'react-redux';
import { ClientSet, utilClientName } from '../../utils/common';

const Projects = () => {
  const [searchParams] = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clientSet, setClientSet] = useState<ClientSet[]>([]);
  const [myProjects, setMyProjects] = useState([]);
  const { projects } = useSelector(
    (state: RootState) => state.rootSlices.allProjects,
  );
  const { clients } = useSelector(
    (state: RootState) => state.rootSlices.allClients,
  );
  const user = useSelector((state: RootState) => state.rootSlices.user);
  const [filterPro, setFilterPro] = useState([]);
  const [checked, setChecked] = useState(true);
  const [type, setType] = useState('');
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    unqClients();
  }, [clients]);

  useEffect(() => {
    fetchMyProjects();
    if (
      searchParams.get('checked') === '' ||
      searchParams.get('checked') === 'true'
    ) {
      setChecked(true);
    } else if (searchParams.get('checked') === 'false') {
      setChecked(false);
    }
    if (searchParams.get('searchVal'))
      setSearchVal(searchParams.get('searchVal') ?? '');

    if (searchParams.get('type')) setType(searchParams.get('type') ?? '');
  }, []);

  useEffect(() => {
    if (checked) {
      filterFunctionality(myProjects);
    } else {
      filterFunctionality(projects);
    }
  }, [checked, type, searchVal, myProjects]);

  const filterFunctionality = (pro: any) => {
    let temp = pro;
    if (searchVal !== '') {
      temp = temp?.filter(
        (project: { title: string; client: any }) =>
          project?.title.toLowerCase().includes(searchVal) ||
          project?.client.name.toLowerCase().includes(searchVal),
      );
    }
    if (type !== '' && type !== 'none') {
      temp = temp?.filter((item: { type: string }) => item.type === type);
    }
    setFilterPro(temp);
  };

  const insertUrlParam = (key: string, value: string) => {
    if (window && window.history.pushState) {
      const params = new URLSearchParams(window.location.search);
      params.set(key, value);
      const newurl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        '?' +
        params.toString();
      window.history.pushState({ path: newurl }, '', newurl);
    }
  };

  const handleCheck = () => {
    setChecked(!checked);
    insertUrlParam('checked', `${!checked}`);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.currentTarget.value);
    insertUrlParam('type', e.currentTarget.value);
  };

  const handleInput = (ele: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(ele.currentTarget.value);
    insertUrlParam('searchVal', ele.currentTarget.value);
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
              <Input
                color='grayLight'
                fontSize='14px'
                textStyle='sourceSansProRegular'
                _placeholder={{ color: 'grayLight' }}
                value={searchVal}
                onChange={(ele) => handleInput(ele)}
                placeholder={'Search client'}
              />
            </Box>
            <Select
              w='186px'
              color='grayLight'
              fontSize='14px'
              textStyle='sourceSansProRegular'
              value={type}
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
          {filterPro?.length > 0 ? (
            clientSet?.length > 0 &&
            clientSet?.map((client) => {
              const projectPerClient = filterPro?.filter(
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
            })
          ) : (
            <Text>No Projects Found</Text>
          )}
        </Box>
      </Box>
      <ModalBox />
    </Box>
  );
};

export default Projects;
