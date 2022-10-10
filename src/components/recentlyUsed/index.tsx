import React from 'react';
import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { RootState } from '../../redux';
import { useSelector } from 'react-redux';

const RecentlyUsed = ({ setFormData, formData, setRecentlyUsedFlag }: any) => {
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
              borderColor='borderColor'
              fontSize='16px'
              textStyle='sourceSansProRegular'
              lineHeight='24px'
              display='flex'
              alignItems='center'
              key={index}
              cursor='pointer'
              onClick={() => {
                mapFormData(_.projectId, _.milestoneId, _.taskId);
                setRecentlyUsedFlag(true);
              }}
            >
              <Box>
                <Text fontSize='16px' lineHeight='22px' color='textLightMid'>
                  {currentProject?.title}
                </Text>
                <Text fontSize='14px' lineHeight='20px' color='textLight'>
                  {currentProject?.client.name}
                </Text>
              </Box>
            </ListItem>
          );
        })}
        {recentlyUsedProject.length === 0 && (
          <Box p='45px 15px'>
            <Text
              fontSize='16px'
              lineHeight='1.5'
              textStyle='sourceSansProRegular'
              color='blackGray'
              textAlign='center'
            >
              No recently used projects.
            </Text>
          </Box>
        )}
      </UnorderedList>
    </Box>
  );
};

export default RecentlyUsed;
