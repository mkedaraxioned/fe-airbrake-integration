import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as EditSvg } from '../../assets/images/edit.svg';
import { ReactComponent as ManageTaskSvg } from '../../assets/images/manage_task.svg';
import { useParams } from 'react-router';
import { _get } from '../../utils/api';
import FixedProjectManage, {
  FixedFormDataPhase,
  FixedProjectError,
  Phase,
} from '../../components/fixedProjectManage';
import CreateMilestone from '../../components/createMilestone';
import RecurringProjectManage, {
  RecurringProjectError,
} from '../../components/recurringProjectManage';
import { timeStringValidate } from '../../utils/validation';

const ManageTask = () => {
  const [projectData, setProjectData] = useState<any>();
  const [recurringFormData, setRecurringFormData] = useState<any>({
    tasks: [{ title: '', hr: '' }],
    milestone: [{ title: 'Month(May 18 - Jun 17)', budget: '80' }],
  });
  const [fixedFormData, setFixedFormData] = useState<FixedFormDataPhase>({
    phase: [{ title: '', budget: '' }],
  });
  const [fixedProjectErr, setFixedProjectErr] = useState<FixedProjectError>({
    phaseEr: '',
  });

  const [recurringProjectErr, setRecurringProjectErr] = useState<any>({
    taskEr: '',
    milestoneEr: '',
  });
  const toast = useToast();

  const { projectId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const res = await _get(`api/projects/${projectId}`);
      setProjectData(res.data.project);
    } catch (error) {
      console.log(error);
    }
  };

  const fixedProjectValidation = () => {
    const errors: FixedProjectError = {};
    const { phase } = fixedFormData;

    phase.forEach((elem: Phase) => {
      if (!elem.title) {
        errors.phaseEr = 'Please enter milestone';
      }
      if (!elem.budget || timeStringValidate(elem.budget)) {
        errors.phaseEr = 'Please enter milestone';
      }
    });
    return errors;
  };

  const recurringProjectValidation = () => {
    const errors: RecurringProjectError = {};
    const { tasks, milestone } = recurringFormData;

    milestone.forEach((phase: Phase) => {
      if (!phase.title) {
        errors.milestoneEr = 'Please enter milestone';
      }
      if (!phase.budget || timeStringValidate(phase.budget)) {
        errors.milestoneEr = 'Please enter milestone';
      }
    });

    tasks.forEach((task: { title: string; hr: string }) => {
      if (!task.title) {
        errors.taskEr = 'Please enter task';
      }
      if (!task.hr || timeStringValidate(task.hr)) {
        errors.taskEr = 'Please enter task';
      }
    });

    return errors;
  };
  const ModalBox = () => {
    return (
      <Drawer isOpen={isOpen} size='lg' placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent overflowY='scroll' w='588px !important'>
          <DrawerCloseButton zIndex='10' mt='10px' mr='10px' />
          <DrawerBody>
            {projectId && (
              <CreateMilestone
                onClose={onClose}
                name={projectData?.title}
                projectId={projectId}
              />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  };

  const fixedProjectFormHandler = async () => {
    try {
      setFixedProjectErr(fixedProjectValidation());
      const notValid = fixedProjectValidation();
      if (
        Object.values(notValid).length <= 0 &&
        fixedFormData.phase.length > 0
      ) {
        console.log(fixedFormData, 'fixedFormData');
        onClose();
        toast({
          title: 'Phase',
          description: 'Milestone created successfully.',
          status: 'success',
          duration: 2000,
          position: 'top-right',
          isClosable: true,
        });
      }
    } catch (error) {
      error &&
        toast({
          title: 'Phase',
          description: 'Milestone not created.',
          status: 'error',
          duration: 2000,
          position: 'top-right',
          isClosable: true,
        });
    }
  };
  const recurringProjectFormHandler = async () => {
    try {
      setRecurringProjectErr(recurringProjectValidation());
      const notValid = recurringProjectValidation();
      if (
        Object.values(notValid).length <= 0 &&
        recurringFormData.milestone.length > 0
      ) {
        console.log(recurringFormData, 'recurringFormData');
        onClose();
        toast({
          title: 'Project',
          description: 'Project update successfully.',
          status: 'success',
          duration: 2000,
          position: 'top-right',
          isClosable: true,
        });
      }
    } catch (error) {
      error &&
        toast({
          title: 'Project',
          description: 'Project not updated.',
          status: 'error',
          duration: 2000,
          position: 'top-right',
          isClosable: true,
        });
    }
  };

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (projectData?.type === 'FIXED') {
      await fixedProjectFormHandler();
    } else {
      await recurringProjectFormHandler();
    }
  };

  return (
    <Box>
      <form onSubmit={formHandler}>
        <Box p='15px 55px 80px' className='wrapper' textTransform='capitalize'>
          <Breadcrumb
            m='15px 0'
            fontSize='14px'
            textStyle='sourceSansProRegular'
            spacing='4px'
          >
            <BreadcrumbItem color='black'>
              <Link to='/'>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem color='black'>
              <Link to='/projects'>Projects</Link>
            </BreadcrumbItem>
            <BreadcrumbItem color='black'>
              <Link to={`/projects/${projectData?.id}/`}>
                {projectData?.title}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem color='textLight'>
              <Text>Manage</Text>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex justifyContent='space-between'>
            <Box>
              <Text
                fontSize='14px'
                color='textGray'
                textStyle='sourceSansProRegular'
                lineHeight='17.6px'
                textAlign='left'
              >
                {projectData?.client.name}
              </Text>
              <Heading
                as='h2'
                m='0 !important'
                color='textColor'
                textStyle='sourceSansProBold'
                fontSize='22px'
                lineHeight='27.65px'
              >
                {projectData?.title}
              </Heading>
            </Box>
            <HStack>
              {projectData?.type === 'FIXED' && (
                <Button w='170px' onClick={onOpen} variant='secondary'>
                  <EditSvg />
                  <Text pt='2px' pl='8px'>
                    Create Milestone
                  </Text>
                </Button>
              )}
              <Box>
                <Button w='137px' margin='0 10px' variant='secondary'>
                  <EditSvg />
                  <Text pt='2px' pl='8px'>
                    Edit Project
                  </Text>
                </Button>
              </Box>
              <Button
                type='submit'
                w={projectData?.type === 'FIXED' ? '147px' : '137px'}
                variant='primary'
              >
                <ManageTaskSvg />
                <Text pt='2px' pl='8px'>
                  {projectData?.type === 'FIXED'
                    ? 'Manage Phase'
                    : 'Manage Task'}
                </Text>
              </Button>
            </HStack>
          </Flex>
          <Box p='30px 0'>
            <Box pos='relative'>
              <Text
                color='textColor'
                textStyle='sourceSansProBold'
                fontSize='18px'
                lineHeight='22.63px'
              >
                Manage
              </Text>
            </Box>
            {/* Fixed project */}
            {projectData?.type === 'FIXED' ? (
              <FixedProjectManage
                fixedFormData={fixedFormData}
                setFixedFormData={setFixedFormData}
                fixedProjectErr={fixedProjectErr}
                setFixedProjectErr={setFixedProjectErr}
              />
            ) : (
              <RecurringProjectManage
                setRecurringFormData={setRecurringFormData}
                recurringFormData={recurringFormData}
                recurringProjectErr={recurringProjectErr}
              />
            )}
          </Box>
        </Box>
      </form>
      <ModalBox />
    </Box>
  );
};

export default ManageTask;
