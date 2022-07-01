import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import ProjectCard from '../projectCard';
import './projectList.modules.css';
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
      <UnorderedList
        m='0'
        listStyleType='none'
        display='flex'
        flexWrap='wrap'
        className='project_list'
      >
        <ListItem flexBasis='25%'>
          <ProjectCard calenderChng={true} />
        </ListItem>
        <ListItem flexBasis='25%'>
          <ProjectCard />
        </ListItem>
        <ListItem flexBasis='25%'>
          <ProjectCard calenderChng={true} />
        </ListItem>
        <ListItem flexBasis='25%'>
          <ProjectCard calenderChng={true} />
        </ListItem>
        <ListItem flexBasis='25%'>
          <ProjectCard />
        </ListItem>
      </UnorderedList>
    </Box>
  );
};

export default ProjectList;
