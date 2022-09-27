import { Box, Button, Text, VStack } from '@chakra-ui/react';
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
        <VStack m={'48px 0 20px 0'}>
          <Text
            mb='5px'
            fontSize={'22px'}
            lineHeight={'28px'}
            textAlign={'center'}
            textStyle='sourceSansProRegular'
            color='blackGray'
          >
            No milestones present in the project.
          </Text>
          <Link to='manage'>
            <Button variant='primary' objectFit='contain' gap='6px'>
              <IoAddSharp size='21' />
              <Text>Add Milestone</Text>
            </Button>
          </Link>
        </VStack>
      )}
    </Box>
  );
};

export default RecurringProjectTasks;
