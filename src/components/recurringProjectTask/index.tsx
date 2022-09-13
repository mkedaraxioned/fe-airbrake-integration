import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { EProjectType } from '../../constants/enum';
import { ProjectMileStone } from '../../interfaces/projectDetails';
import TaskDetail from '../taskDetail';
interface Props {
  milestoneList: ProjectMileStone[];
  projectType?: EProjectType;
}

const RecurringProjectTasks = ({ milestoneList }: Props) => {
  return (
    <Box>
      {milestoneList ? (
        milestoneList.map((milestone: ProjectMileStone, i: number) => {
          return milestone && <TaskDetail key={i} milestone={milestone} />;
        })
      ) : (
        <Text
          fontSize={'22px'}
          lineHeight={'28px'}
          textAlign={'center'}
          textStyle='sourceSansProRegular'
          color='blackGray'
          m={'68px 0 20px 0'}
        >
          No Activities Found
        </Text>
      )}
    </Box>
  );
};

export default RecurringProjectTasks;
