import { Box } from '@chakra-ui/react';
import React from 'react';
import TaskDetail from '../taskDetail';
import TaskDetailGranular from '../taskDetailGranular';

const RecurringProjectTasks = ({ milestoneList }: any) => {
  return (
    <Box>
      {milestoneList.map(
        (milestone: any, i: any) =>
          milestone && <TaskDetail key={i} milestone={milestone} />,
      )}
      {/* <TaskDetailGranular /> */}
    </Box>
  );
};

export default RecurringProjectTasks;
