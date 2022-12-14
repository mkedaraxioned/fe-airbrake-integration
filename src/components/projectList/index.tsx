import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import ProjectCard from '../projectCard';
import './projectList.modules.css';
const ProjectList = ({ clientName, projects }: any) => {
  return (
    <Box>
      {projects?.length > 0 && (
        <Text
          mb='8px'
          color='textColor'
          fontSize='20px'
          textStyle='sourceSansProBold'
          lineHeight='27.65px'
        >
          {clientName}
        </Text>
      )}
      <UnorderedList
        m='0'
        listStyleType='none'
        display='flex'
        flexWrap='wrap'
        className='project_list'
      >
        {projects?.map((project: any, index: number) => (
          <ListItem flexBasis='25%' key={index}>
            <ProjectCard project={project} />
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default ProjectList;
