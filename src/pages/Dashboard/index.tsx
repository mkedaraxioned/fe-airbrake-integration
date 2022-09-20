import { Box, Flex, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Calendar from '../../components/calender';
import RecentlyUsed from '../../components/recentlyUsed';
import TaskList from '../../components/taskList';
import TimeLogFrom from '../../components/timeLogForm';
import { allUsers } from '../../redux/reducers/allUserSlice';
import { allClients } from '../../redux/reducers/clientsSlice';
import { allProjects } from '../../redux/reducers/projectsSlice';
import { _get } from '../../utils/api';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    date: new Date(),
    projectId: '',
    milestoneId: '',
    taskId: '',
    logTime: '',
    comments: '',
    billingType: false,
  });

  const { timeCardId } = useParams();
  const dispatch = useDispatch();
  const showDetailsHandle = (dayStr: string) => {
    setFormData({ ...formData, date: new Date(dayStr) });
  };

  useEffect(() => {
    fetchClientsProjects();
  }, []);

  useEffect(() => {
    setFormData({
      date: new Date(),
      projectId: '',
      milestoneId: '',
      taskId: '',
      logTime: '',
      comments: '',
      billingType: false,
    });
  }, [location.pathname]);

  const fetchClientsProjects = async () => {
    const clientRes = await _get('api/clients');
    const projectsRes = await _get('api/projects');
    const usersRes = await _get('api/users/all');
    dispatch(allProjects(projectsRes.data?.projects));
    dispatch(allClients(clientRes.data?.clients));
    dispatch(allUsers(usersRes.data?.users));
  };

  return (
    <Box className='wrapper'>
      <Flex minH='calc(100vh - 78px)' justifyContent='flex-start'>
        <Box flexBasis='20%' pr='40px'>
          <Box w='323px' mt='40px'>
            <Calendar
              showDetailsHandle={showDetailsHandle}
              formDate={formData.date}
              setFormData={setFormData}
              formData={formData}
            />
          </Box>
        </Box>
        <Box
          p={{ lg: '40px 40px 0', '2xl': '40px 45px 0' }}
          borderLeft='1px'
          borderRight='1px'
          borderColor='borderColor'
          flexBasis='41%'
          bg='white'
          className='middle_container'
        >
          <Box>
            <Heading
              as='h3'
              fontSize='22px'
              lineHeight='27.65px'
              color='textColor'
              textStyle='sourceSansProBold'
              mb='15px'
            >
              {timeCardId ? 'Edit entry' : 'Add a new entry'}
            </Heading>
            <TimeLogFrom formData={formData} setFormData={setFormData} />
          </Box>
          <Box mt='26px'>
            <TaskList formData={formData} />
          </Box>
        </Box>
        <Box p='40px 0 0 47px' flexBasis='35%'>
          <Heading
            as='h2'
            fontSize='22px'
            textStyle='sourceSansProRegular'
            lineHeight='27.65px'
            color='textLightMid'
          >
            Recently Used
          </Heading>
          <RecentlyUsed setFormData={setFormData} formData={formData} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;
