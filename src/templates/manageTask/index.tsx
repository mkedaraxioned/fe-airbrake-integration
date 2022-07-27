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
  FormControl,
  Heading,
  HStack,
  Input,
  ListItem,
  StackDivider,
  Text,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Task } from '../../interfaces/editProject';
import { ReactComponent as DeleteSvg } from '../../assets/images/delete.svg';
import CustomCheckbox from '../../components/customCheckBox';
import { ReactComponent as EditSvg } from '../../assets/images/edit.svg';
import { ReactComponent as ManageTaskSvg } from '../../assets/images/manage_task.svg';
import { useParams } from 'react-router';
import { _get } from '../../utils/api';
import FixedProjectManage from '../../components/fixedProjectManage';
import CreateMilestone from '../../components/createMilestone';

const ManageTask = () => {
  const [projectData, setProjectData] = useState<any>();
  const [fixedFormData, setFixedFormData] = useState<any>({
    phase: [],
  });

  console.log(projectData, 'projectData');
  const [formData, setFormData] = useState<any>({
    task: [],
    milestone: [],
  });
  const [taskNode, setTaskNode] = useState<Task[]>([{ title: '', hr: '' }]);
  const [mileStone, setMileStone] = useState<any>([
    { title: 'Month(May 18 - Jun 17)', hr: '80' },
    { title: 'Month(Jun 18 - Jul 17)', hr: '40' },
  ]);
  const [isVisibleIndex, setIsVisibleIndex] = useState(0);
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

  const over = (index: number) => {
    setIsVisibleIndex(index);
  };

  const out = () => {
    setIsVisibleIndex(0);
  };

  const addTaskControls = () => {
    setTaskNode([...taskNode, { title: '', hr: '' }]);
  };

  const removeTaskControls = (taskIndex: number) => {
    const filterTask = taskNode.filter((_, index) => index !== taskIndex);
    setTaskNode(filterTask);
  };

  const checkHandler = (e: any): void => {
    console.log(e.target.checked, 'val');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value }: { name: string; value: string } = e.target;
    const list: any = [...taskNode];
    list[index][name] = value;
    setTaskNode(list);
    setFormData({ ...formData, task: list });
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

  const handleInputChangeMilestone = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value }: { name: string; value: string } = e.target;
    const mileStoneList: any = [...mileStone];
    mileStoneList[index][name] = value;
    setMileStone(mileStoneList);
    setFormData({ ...formData, milestone: mileStoneList });
  };
  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Box>
      <form onSubmit={formHandler}>
        <Box p='15px 55px 80px' className='wrapper'>
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
              />
            ) : (
              <HStack
                justifyContent='space-between'
                alignItems='flex-start'
                divider={<StackDivider />}
              >
                <Box p='22px 0'>
                  <Flex
                    justifyContent='space-between'
                    color='textLightMid'
                    textStyle='sourceSansProBold'
                    fontSize='14px'
                    lineHeight='17.6px'
                  >
                    <Text>Month cycle - Milestone</Text>
                    <Text>Total budget hrs (opt)</Text>
                  </Flex>
                  <UnorderedList m='0'>
                    {mileStone.length > 0 &&
                      mileStone.map((_: any, index: any) => {
                        return (
                          <ListItem key={index} m='20px 0' display='flex'>
                            <Input
                              w='387px'
                              mr='32px'
                              textStyle='inputTextStyle'
                              type='text'
                              name='title'
                              value={_.title}
                              onChange={(e) =>
                                handleInputChangeMilestone(e, index)
                              }
                            />
                            <FormControl w='114px'>
                              <Input
                                type='text'
                                textStyle='inputTextStyle'
                                value={_.budget}
                                name='hr'
                                onChange={(e) =>
                                  handleInputChangeMilestone(e, index)
                                }
                                textAlign='center'
                              />
                            </FormControl>
                          </ListItem>
                        );
                      })}
                  </UnorderedList>
                  <Text textStyle='inputTextStyle' textDecor='underline'>
                    Load older entries
                  </Text>
                </Box>
                <Box p='22px 0'>
                  <Flex w='562px' justifyContent='space-between'>
                    <HStack
                      flexBasis='69%'
                      justifyContent='space-between'
                      color='textLightMid'
                      textStyle='sourceSansProBold'
                      fontSize='14px'
                      lineHeight='17.6px'
                    >
                      <Text>Task/Activity name</Text>
                      <Text fontWeight='400' textDecor='underline'>
                        View archive tasks
                      </Text>
                    </HStack>
                    <HStack
                      flexBasis='26%'
                      justifyContent='space-between'
                      color='textLightMid'
                      textStyle='sourceSansProBold'
                      fontSize='14px'
                      lineHeight='17.6px'
                    >
                      <Text>Budget Hrs</Text>
                      <Text m='0 !important'>Archive</Text>
                    </HStack>
                  </Flex>
                  <UnorderedList listStyleType='none' m='0'>
                    {taskNode.map((_, index) => {
                      return (
                        <ListItem
                          m='20px 0'
                          key={index}
                          onMouseOver={() => over(index)}
                          onMouseOut={out}
                        >
                          <HStack pos='relative'>
                            <FormControl w='387px' mr='20px'>
                              <Input
                                type='text'
                                textStyle='inputTextStyle'
                                placeholder='Enter Task'
                                value={_.title}
                                name='title'
                                onChange={(e) => handleInputChange(e, index)}
                              />
                            </FormControl>
                            <FormControl w='60px' mr='37px !important'>
                              <Input
                                type='text'
                                placeholder='Hrs'
                                textStyle='inputTextStyle'
                                value={_.hr}
                                name='hr'
                                onChange={(e) => handleInputChange(e, index)}
                                textAlign='center'
                              />
                            </FormControl>
                            <Box>
                              <CustomCheckbox onChange={checkHandler} />
                            </Box>
                            {index === 0 ? null : (
                              <Box
                                display={
                                  isVisibleIndex === index ? 'block' : 'none'
                                }
                                pos='absolute'
                                top='24%'
                                right='-10px'
                                cursor='pointer'
                                onClick={() => removeTaskControls(index)}
                              >
                                <DeleteSvg />
                              </Box>
                            )}
                          </HStack>
                        </ListItem>
                      );
                    })}
                  </UnorderedList>
                  <Box
                    display='flex'
                    alignItems='center'
                    textStyle='inputTextStyle'
                    cursor='pointer'
                  >
                    <AiOutlinePlusCircle />
                    <Text
                      ml='5px'
                      textStyle='inputTextStyle'
                      onClick={addTaskControls}
                      _hover={{
                        textDecor: 'underline',
                      }}
                    >
                      Add new task
                    </Text>
                  </Box>
                </Box>
              </HStack>
            )}
          </Box>
        </Box>
      </form>
      <ModalBox />
    </Box>
  );
};

export default ManageTask;
