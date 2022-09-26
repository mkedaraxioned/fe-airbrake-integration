import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import RecurringProjectTasks from '../../components/recurringProjectTask';
import { useParams } from 'react-router';
import { _get } from '../../utils/api';
import ProjectDetailsHeader from '../../components/ProjectDetails/ProjectDetailsHeader';

const ProjectTaskDetails = () => {
  const [, setLoading] = useState<boolean>(true);
  const [projectData, setProjectData] = useState<any>();
  const [projectBasics, setProjectBasics] = useState<object | null>(null);
  const { projectId } = useParams();

  // TODO: invalidating tags pending, hence not using them
  // const { data, isLoading } = useGetSelectedProjectQuery(projectId);

  useEffect(() => {
    getProject();
  }, [projectId]);

  const getProject = async () => {
    try {
      if (projectId) {
        const res = await _get(`api/projects/${projectId}/report`);
        if (res.data.data.projectType === 'RETAINER_GRANULAR') {
          const resG = await _get(`api/projects/${projectId}/granular/report`);
          setProjectData(resG.data.data);
          setLoading(false);
          setProjectBasics({
            clientName: res.data.data.clientName,
            projectName: res.data.data.projectName,
          });
        } else {
          setProjectData(res.data.data);
          setLoading(false);
          setProjectBasics({
            clientName: res.data.data.clientName,
            projectName: res.data.data.projectName,
          });
        }
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <Box>
      <Box p='15px 0' className='wrapper'>
        <ProjectDetailsHeader
          projectName={projectData?.projectName}
          clientName={projectData?.clientName}
          projectId={projectId}
          projectType={projectData?.projectType}
        />
      </Box>
      {projectData && (
        <RecurringProjectTasks
          projectBasics={projectBasics}
          milestoneList={projectData?.milestones || projectData?.tasks}
          projectType={projectData.projectType}
        />
      )}
    </Box>
  );
};

export default ProjectTaskDetails;
