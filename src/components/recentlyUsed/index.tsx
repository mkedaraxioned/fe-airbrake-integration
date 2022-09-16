import React from 'react';
import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { RootState } from '../../redux';
import { useSelector } from 'react-redux';

const RecentlyUsed = ({ setFormData, formData }: any) => {
  const {
    recentlyUsed: { recentlyUsedProject },
    allProjects: { projects },
  } = useSelector((state: RootState) => state.rootSlices);

  const mapFormData = (
    projectId: string,
    milestoneId: string,
    taskId: string,
  ) => {
    setFormData({
      ...formData,
      projectId,
      milestoneId,
      taskId,
    });
  };
  return (
    <Box>
      <UnorderedList w='80%' listStyleType='none' m='0'>
        {recentlyUsedProject?.map((_: any, index: number) => {
          const currentProject = projects?.find(
            (project: { id: string }) => project.id === _.projectId,
          );
          return (
            <ListItem
              p='12px 0'
              borderBottom='1px'
              borderColor='borderPrimary'
              fontSize='16px'
              textStyle='sourceSansProRegular'
              lineHeight='24px'
              display='flex'
              alignItems='center'
              key={index}
              cursor='pointer'
              onClick={() => mapFormData(_.projectId, _.milestoneId, _.taskId)}
            >
              <Box>
                <Text fontSize='14px' lineHeight='17.6px' color='textLightMid'>
                  {currentProject?.title}
                </Text>
                <Text fontSize='12px' lineHeight='15.08px' color='textLight'>
                  {currentProject?.client.name}
                </Text>
              </Box>
            </ListItem>
          );
        })}
      </UnorderedList>
    </Box>
  );
};

export default RecentlyUsed;
