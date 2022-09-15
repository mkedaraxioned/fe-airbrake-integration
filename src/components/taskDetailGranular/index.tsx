import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  List,
  ListItem,
  Progress,
  Text,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { ReactComponent as EditGreyIcon } from '../../assets/images/editGreyIcon.svg';
import {
  ProjectActivity,
  ProjectMileStone,
  ProjectTask,
  ProjectUser,
} from '../../interfaces/projectDetails';
import { convertMinutes, percentage } from '../../utils/common';
import UserRow from '../taskDetail/userRow';

interface Props {
  milestone?: ProjectMileStone;
}

const TaskDetailGranular = ({ milestone }: Props) => {
  return (
    <Box m='20px 0 40px'>
      <Flex
        width='full'
        p='13px 25px'
        alignItems='center'
        justifyContent='space-between'
        bg='purple'
        color='white'
        fontSize='14px'
        textStyle='sourceSansProBold'
        lineHeight='17.6px'
      >
        <Flex justifyContent='space-between' flexBasis='50%'>
          <Text>{milestone?.title}</Text>
          <Text>
            Budget - {milestone?.budget && convertMinutes(milestone?.budget)}
          </Text>
        </Flex>
        <Divider
          ml='10px'
          mr='16px'
          orientation='vertical'
          h='20px'
          border='1px'
          borderColor='white'
        />
        <Flex
          justifyContent='space-between'
          alignItems='center'
          flexBasis='50%'
        >
          <Text>
            Actual - {milestone?.logTime && convertMinutes(milestone?.logTime)}{' '}
            Hrs
          </Text>
          <Flex alignItems='center'>
            <Flex alignItems='center'>
              <Progress
                value={
                  milestone?.budget &&
                  percentage(milestone?.logTime, milestone?.budget)
                }
                w='200px'
                rounded='full'
                size='sm'
                colorScheme='green'
                bg='white'
              />
              <Text pl='5px'>
                {milestone?.budget &&
                  percentage(milestone?.logTime, milestone?.budget)}
                %
              </Text>
            </Flex>
            <Text pl='43px'>
              <HiDotsHorizontal />
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Accordion
        allowToggle
        borderLeft='1px'
        borderRight='1px'
        borderColor='borderColor'
      >
        {milestone?.tasks?.map((task: ProjectTask, id: number) => {
          return (
            <AccordionItem key={id}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton
                      pt='14px'
                      pb='14px'
                      pl='25px'
                      display='flex'
                      justifyContent='space-between'
                      bg='purpleLight'
                      color='grayLight'
                      fontSize='14px'
                      textStyle='sourceSansProRegular'
                      lineHeight='17.6px'
                      _focus={{
                        outline: 'none',
                        borderBottom: '1px',
                        borderColor: 'borderColor',
                      }}
                    >
                      <Flex>
                        <Box
                          padding='2px 1px 1px '
                          border='2px'
                          borderColor='borderDark'
                          mr='10px'
                          color='borderDark'
                        >
                          {isExpanded ? (
                            <FaMinus fontSize='10px' />
                          ) : (
                            <FaPlus fontSize='10px' />
                          )}
                        </Box>
                        <Box>
                          <Text textAlign='left'>{task?.title}</Text>
                        </Box>
                      </Flex>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel p='0'>
                    <Flex
                      p='8px 4% 8px 2%'
                      justifyContent='space-between'
                      bg='bgGray'
                      color='grayLight'
                      fontSize='14px'
                      textStyle='sourceSansProBold'
                      lineHeight='17.6px'
                    >
                      <Text flexBasis='25%'>Name</Text>
                      <Text flexBasis='48%'>Comments/Notes</Text>
                      <Text flexBasis='10%' textAlign={'right'}>
                        Hours
                      </Text>
                      <Text flexBasis='17%' textAlign={'right'}>
                        Last updated date
                      </Text>
                    </Flex>
                    <Box>
                      <Accordion
                        allowToggle
                        borderLeft='1px'
                        borderRight='1px'
                        borderColor='borderColor'
                      >
                        {task?.users?.map((user: ProjectUser, id: number) => {
                          const updateDateFormat = 'dd MMM yyyy';
                          const sortByLastUpdated =
                            user?.timecards?.length > 0 &&
                            user?.timecards?.length > 1
                              ? user.timecards
                                  .sort(
                                    (a: ProjectActivity, b: ProjectActivity) =>
                                      a.updateAt.localeCompare(b.updateAt),
                                  )
                                  .reverse()
                              : user.timecards;
                          const formatUpdatedDate =
                            user.timecards.length > 0
                              ? format(
                                  new Date(sortByLastUpdated[0]?.updateAt),
                                  updateDateFormat,
                                )
                              : null;
                          return (
                            user.timecards.length > 0 && (
                              <AccordionItem key={id}>
                                {({ isExpanded }) => (
                                  <>
                                    <AccordionButton
                                      p='15px 4% 15px 2%'
                                      display='flex'
                                      justifyContent='space-between'
                                      color='grayLight'
                                      fontSize='14px'
                                      textStyle='sourceSansProRegular'
                                      lineHeight='17.6px'
                                      _focus={{
                                        outline: 'none',
                                        borderColor: 'borderColor',
                                        border: 'none !important',
                                      }}
                                    >
                                      <Flex flexBasis={'73%'}>
                                        <Box
                                          padding='2px 1px 1px '
                                          border='2px'
                                          borderColor='borderDark'
                                          mr='10px'
                                          color='borderDark'
                                        >
                                          {isExpanded ? (
                                            <FaMinus fontSize='10px' />
                                          ) : (
                                            <FaPlus fontSize='10px' />
                                          )}
                                        </Box>
                                        <Box>
                                          <Text textAlign='left'>
                                            {user?.name}
                                          </Text>
                                        </Box>
                                      </Flex>
                                      <Text
                                        flexBasis={'10%'}
                                        textAlign={'right'}
                                      >
                                        {convertMinutes(user?.logTime)}
                                      </Text>
                                      <Text
                                        flexBasis={'17%'}
                                        textAlign={'right'}
                                      >
                                        {formatUpdatedDate}
                                      </Text>
                                    </AccordionButton>
                                    <AccordionPanel p={0}>
                                      <List>
                                        {user?.timecards?.length > 1 ? (
                                          user.timecards
                                            ?.sort(
                                              (
                                                a: ProjectActivity,
                                                b: ProjectActivity,
                                              ) => a.date.localeCompare(b.date),
                                            )
                                            ?.map(
                                              (activity: ProjectActivity) => (
                                                <UserRow
                                                  key={activity.timecardId}
                                                  activity={activity}
                                                />
                                              ),
                                            )
                                        ) : (
                                          <UserRow
                                            activity={user?.timecards[0]}
                                          />
                                        )}
                                      </List>
                                    </AccordionPanel>
                                  </>
                                )}
                              </AccordionItem>
                            )
                          );
                        })}
                      </Accordion>
                    </Box>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </Box>
  );
};

export default TaskDetailGranular;
