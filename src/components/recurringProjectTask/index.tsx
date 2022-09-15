import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { EProjectType } from '../../constants/enum';
import { ProjectMileStone } from '../../interfaces/projectDetails';
import TaskDetail from '../taskDetail';
import TaskDetailGranular from '../taskDetailGranular';
interface Props {
  milestoneList: ProjectMileStone[];
  projectType?: EProjectType;
}

const ProjectDetailType = ({ milestoneList, projectType }: Props) => {
  return (
    <>
      {projectType === 'RETAINER_GRANULAR'
        ? milestoneList.map((milestone: ProjectMileStone, id: number) => {
            return (
              milestone && <TaskDetailGranular key={id} milestone={milestone} />
            );
          })
        : milestoneList.map((milestone: ProjectMileStone, i: number) => {
            return milestone && <TaskDetail key={i} milestone={milestone} />;
          })}
    </>
  );
};

const RecurringProjectTasks = ({ milestoneList, projectType }: Props) => {
  return (
    <Box>
      {milestoneList && milestoneList.length > 0 ? (
        <ProjectDetailType
          projectType={projectType}
          milestoneList={milestoneList}
        />
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
