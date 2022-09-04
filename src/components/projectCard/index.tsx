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

interface Props {
  project: any;
}

const ProjectCard = ({ project }: Props) => {
  const { users } = useSelector(
    (state: RootState) => state.rootSlices.allUsers,
  );
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
          alignItems='center'
          p='15px 22px'
          justifyContent='space-between'
          borderBottom='1px'
          borderColor='borderColor'
        >
          <Text
            color='textColor'
            fontSize='18px'
            textStyle='sourceSansProBold'
            lineHeight='22.63px'
            textTransform='capitalize'
          >
            {project.title}
          </Text>
          <Tooltip
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
              p='2px 8px'
              bg='greenLightBg'
              color='greenLight'
              fontSize='13.83px'
              textStyle='sourceSansProBold'
              lineHeight='17.39px'
              display='inline-block'
              as='span'
            >
              20 hours remaining
            </Text>
          </Text>
          <Text
            color='textColor'
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
