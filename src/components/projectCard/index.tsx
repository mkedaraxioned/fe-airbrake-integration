import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as CalenderIcon1 } from '../../assets/images/calenderIcon1.svg';
import { ReactComponent as CalenderIcon2 } from '../../assets/images/calenderIcon2.svg';
import { RootState } from '../../redux';
import { percentage } from '../../utils/common';

interface Props {
  project: any;
}

const ProjectCard = ({ project }: Props) => {
  const { users } = useSelector(
    (state: RootState) => state.rootSlices.allUsers,
  );

  const timeColorFunc = () => {
    const per = percentage(project?.timeLogged, project?.projectBudget);

    if (per < 90) {
      return 'green';
    } else if (per < 100) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  const minutesToDecimal = (n: string) => {
    const result = parseFloat(n) / 60;
    if (parseFloat(n) % 60 === 0) {
      return result;
    } else return result.toFixed(1);
  };

  return (
    <Box
      w='full'
      border='1px'
      borderColor='borderColor'
      rounded='md'
      className='project-card'
      boxSizing='border-box'
    >
      <Link to={`/projects/${project.id}`}>
        <Flex
          minH='61px'
          alignItems='center'
          p='10px 22px'
          justifyContent='space-between'
          borderBottom='1px'
          borderColor='borderColor'
        >
          <Text
            color='grayLight'
            fontSize='16px'
            textStyle='sourceSansProBold'
            lineHeight='20.11px'
            textTransform='capitalize'
            flexBasis='90%'
          >
            {project.title}
          </Text>
          <Tooltip
            flexBasis='10%'
            label={
              project.type === 'FIXED'
                ? 'Fixed'
                : project.type === 'RETAINER'
                ? 'Retainer'
                : 'Retainer(Granular)'
            }
          >
            {project.type === 'FIXED' ? <CalenderIcon1 /> : <CalenderIcon2 />}
          </Tooltip>
        </Flex>
        <Box p='12px 22px'>
          <Text>
            <Text
              p='4px 8px'
              borderRadius='2px'
              bg={
                project?.timeLogged === 0
                  ? '#F5F7F8'
                  : `${timeColorFunc()}LightBg`
              }
              color={
                project?.timeLogged === 0
                  ? '#757575'
                  : `${timeColorFunc()}Light`
              }
              fontSize='13.83px'
              textStyle='sourceSansProBold'
              lineHeight='17.39px'
              display='inline-block'
              as='span'
            >
              {project?.timeLogged === 0
                ? 'No time added'
                : `${minutesToDecimal(
                    project?.timeLogged,
                  )} / ${minutesToDecimal(project?.projectBudget)} Hours`}
            </Text>
          </Text>
          <Text
            color='grayLight'
            p='10px 0 5px'
            fontSize='14px'
            textStyle='sourceSansProBold'
            lineHeight='17.6px'
          >
            Members:
          </Text>
          <AvatarGroup size='sm' flexWrap='wrap' w='60%'>
            {project.memberIds?.map((member: any) => {
              return users?.map((user: any) =>
                user.id === member ? (
                  <Avatar
                    name={user.name}
                    title={user.name}
                    src={user.avatar}
                  />
                ) : null,
              );
            })}
          </AvatarGroup>
        </Box>
      </Link>
    </Box>
  );
};

export default ProjectCard;
