import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { EProjectType } from '../../constants/enum';
import { ProjectMileStone } from '../../interfaces/projectDetails';
import TaskDetail from '../taskDetail';
import TaskDetailGranular from '../taskDetailGranular';

interface Props {
  milestoneList: ProjectMileStone[];
  projectType: EProjectType;
}

const RecurringProjectTasks = ({ milestoneList, projectType }: Props) => {
  return (
    <Box>
      {milestoneList ? (
        milestoneList.map((milestone: ProjectMileStone, i: number) => {
          if (milestone) {
            return projectType === EProjectType.RETAINER_GRANULAR ? (
              <TaskDetailGranular key={i} milestone={milestone} />
            ) : (
              <TaskDetail key={i} milestone={milestone} />
            );
          }
        })
      ) : (
        <Text>No Activities Found</Text>
      )}
    </Box>
  );
};

export default RecurringProjectTasks;
