import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { IoAddSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { EProjectType } from '../../constants/enum';
import { ProjectMileStone } from '../../interfaces/projectDetails';
import TaskDetail from '../taskDetail';
import TaskDetailGranular from '../taskDetailGranular';
interface Props {
  milestoneList: ProjectMileStone[];
  projectType?: EProjectType;
  projectBasics?: any;
}

const ProjectDetailType = ({
  milestoneList,
  projectType,
  projectBasics,
}: Props) => {
  return (
    <>
      <Box className='wrapper'>
        <Box pos='relative'>
          <Text
            color='textColor'
            textStyle='sourceSansProBold'
            fontSize='18px'
            lineHeight='22.63px'
          >
            Milestone details
          </Text>
        </Box>
      </Box>
      {projectType === EProjectType.RETAINER_GRANULAR
        ? milestoneList.map((milestone: ProjectMileStone, id: number) => {
            return (
              milestone && (
                <TaskDetailGranular
                  key={id}
                  milestone={milestone}
                  projectBasics={projectBasics}
                />
              )
            );
          })
        : milestoneList.map((milestone: ProjectMileStone, i: number) => {
            return (
              milestone && (
                <TaskDetail
                  key={i}
                  milestone={milestone}
                  projectBasics={projectBasics}
                />
              )
            );
          })}
    </>
  );
};

const RecurringProjectTasks = ({
  milestoneList,
  projectType,
  projectBasics,
}: Props) => {
  return (
    <Box>
      {milestoneList && milestoneList.length > 0 ? (
        <ProjectDetailType
          projectType={projectType}
          milestoneList={milestoneList}
          projectBasics={projectBasics}
        />
      ) : (
        <Box display='flex' justifyContent='center' m={'68px 0 20px 0'}>
          <Link to='manage'>
            <Button w='137px' variant='secondary'>
              <IoAddSharp size='21' />
              <Text>Add Milestone</Text>
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default RecurringProjectTasks;
