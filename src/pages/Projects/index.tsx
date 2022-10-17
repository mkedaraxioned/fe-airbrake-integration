import React, { useEffect, useState } from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Checkbox,
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
import { useSelector, useDispatch } from 'react-redux';
import { ClientSet, utilClientName } from '../../utils/common';
import { filterFunc } from '../../redux/reducers/projectFilterSlice';
import { DrawerContainer } from '../../components/drawer';

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

  const { filterVal } = useSelector(
    (state: RootState) => state.rootSlices.projectFilter,
  );
  const user = useSelector((state: RootState) => state.rootSlices.user);
  const [filterPro, setFilterPro] = useState([]);
  const [checked, setChecked] = useState(true);
  const [type, setType] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const dispatch = useDispatch();
  const urlVal = searchParams.get('search');

  useEffect(() => {
    unqClients();
  }, [clients]);

  useEffect(() => {
    if (urlVal) {
      setSearchVal(urlVal);
      setChecked(false);
    }
  }, [urlVal]);

  useEffect(() => {
    fetchMyProjects();
    paramsVal();
  }, []);

  useEffect(() => {
    if (checked) {
      filterFunctionality(myProjects);
      dispatch(filterFunc({ ...filterVal, show: 'my' }));
    } else {
      filterFunctionality(projects);
      dispatch(filterFunc({ ...filterVal, show: 'all' }));
    }
  }, [checked, type, searchVal, myProjects]);

  const paramsVal = () => {
    if (Array.from(searchParams).length > 0) {
      searchParams.get('show') === 'my' && setChecked(true);
      searchParams.get('show') === 'all' && setChecked(false);
      searchParams.get('search') &&
        setSearchVal(searchParams.get('search') ?? '');
      searchParams.get('type') && setType(searchParams.get('type') ?? '');
    } else {
      if (filterVal.show === 'my') {
        setChecked(true);
        filterVal && insertUrlParam('show', `${filterVal.show}`);
      } else if (filterVal.show === 'all') {
        setChecked(false);
        filterVal && insertUrlParam('show', `${filterVal.show}`);
      }
    }
  };

  const filterFunctionality = (pro: any) => {
    let temp = pro;
    const clientMatch = clients.find(
      (client: { name: string }) =>
        client.name.toLowerCase() === searchVal.toLowerCase(),
    );
    if (searchVal !== '') {
      if (clientMatch) {
        temp = temp?.filter(
          (project: { title: string; client: any }) =>
            project?.client?.name?.toLowerCase() === searchVal.toLowerCase(),
        );
      } else {
        temp = temp?.filter(
          (project: { title: string; client: any }) =>
            project?.title?.toLowerCase().includes(searchVal.toLowerCase()) ||
            project?.client?.name
              ?.toLowerCase()
              .includes(searchVal.toLowerCase()),
        );
      }
    }
    if (type !== '' && type !== 'all') {
      temp = temp?.filter((item: { type: string }) =>
        item.type.toLowerCase().includes(type.toLowerCase()),
      );
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
    insertUrlParam('show', !checked ? 'my' : 'all');
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.currentTarget.value);
    insertUrlParam('type', e.currentTarget.value);
  };

  const handleInput = (ele: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(ele.currentTarget.value);
    insertUrlParam('search', ele.currentTarget.value);
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

  return (
    <Box>
      <Box p='15px 0 80px' className='wrapper'>
        <Breadcrumb m='15px 0' fontSize='14px' spacing='4px'>
          <BreadcrumbItem>
            <Link to='/'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Text color='textLight'>Projects</Text>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent='space-between' alignItems='center'>
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
                placeholder={'Search project'}
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
              <option value='all'>All project type</option>
              <option value='fixed'>Fixed</option>
              <option value='retainer'>Retainer</option>
            </Select>
            <Box>
              <Button w='138px' variant='primary' onClick={onOpen}>
                New project
              </Button>
            </Box>
          </HStack>
        </Flex>
        <Box p='15px 0'>
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
      <DrawerContainer isOpen={isOpen} onClose={onClose}>
        <NewProjectForm onClose={onClose} setMyProjects={setMyProjects} />
      </DrawerContainer>
    </Box>
  );
};

export default Projects;
