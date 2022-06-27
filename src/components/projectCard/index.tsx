import { Avatar, AvatarGroup, Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { BiCalendar } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import './projectCard.modules.css';
const ProjectCard = () => {
  return (
    <Box
      w='298px'
      border='1px'
      mr='20px'
      mb='30px'
      borderColor='borderColor'
      rounded='md'
      bg='bgPrimary'
      className='project-card'
    >
      <Link to='/projects/harvest'>
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
          >
            Bed Linen
          </Text>
          <BiCalendar style={{ fontSize: '23px', color: '#718096' }} />
        </Flex>
        <Box p='15px 22px'>
          <Text
            color='greenLight'
            fontSize='13.83px'
            textStyle='sourceSansProBold'
            lineHeight='17.39px'
          >
            20 hours remaining
          </Text>
          <Text
            color='textColor'
            p='5px 0 2px'
            fontSize='14px'
            textStyle='sourceSansProBold'
            lineHeight='17.6px'
          >
            Members:
          </Text>
          <AvatarGroup size='sm' flexWrap='wrap' w='60%'>
            <Avatar name='Dnyaneshwar I' />
            <Avatar name='Vipin Y' />
            <Avatar name='Prajakta P' />
            <Avatar name='Dnyaneshwar I' />
            <Avatar name='Vipin Y' />
            <Avatar name='Prajakta P' />
          </AvatarGroup>
        </Box>
      </Link>
    </Box>
  );
};

export default ProjectCard;
