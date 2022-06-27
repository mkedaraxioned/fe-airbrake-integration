import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import ProjectCard from '../projectCard';

const ProjectList = () => {
  return (
    <Box>
      <Text
        mb='8px'
        color='textColor'
        fontSize='22px'
        textStyle='sourceSansProBold'
        lineHeight='27.65px'
      >
        Harvest
      </Text>
      <Flex flexWrap='wrap'>
        <ProjectCard />
        <ProjectCard calenderChng={true} />
        <ProjectCard />
        <ProjectCard calenderChng={true} />
        <ProjectCard calenderChng={true} />
        <ProjectCard />
      </Flex>
    </Box>
  );
};

export default ProjectList;
