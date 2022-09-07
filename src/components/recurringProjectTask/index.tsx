import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { EProjectType } from '../../constants/enum';
import TaskDetail from '../taskDetail';
import TaskDetailGranular from '../taskDetailGranular';

const RecurringProjectTasks = ({ milestoneList, projectType }: any) => {
  return (
    <Box>
      {milestoneList ? (
        milestoneList.map((milestone: any, i: any) => {
          return milestone && projectType === EProjectType.RETAINER_GRANULAR ? (
            <TaskDetailGranular key={i} milestone={milestone} />
          ) : (
            <TaskDetail key={i} milestone={milestone} />
          );
        })
      ) : (
        <Text>No Activities Found</Text>
      )}
    </Box>
  );
};

export default RecurringProjectTasks;
