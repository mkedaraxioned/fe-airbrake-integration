import { Box } from '@chakra-ui/react';
import React from 'react';
import TaskDetail from '../taskDetail';
import TaskDetailGranular from '../taskDetailGranular';

const RecurringProjectTasks = () => {
  return (
    <Box>
      <TaskDetail />
      <TaskDetail />
      <TaskDetailGranular />
    </Box>
  );
};

export default RecurringProjectTasks;
