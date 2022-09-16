import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  List,
  Progress,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';
import './taskDetail.modules.css';
import { convertMinutes, percentage } from '../../utils/common';
import UserRow from './userRow';
import { format } from 'date-fns';
import {
  ProjectActivity,
  ProjectMileStone,
  ProjectUser,
} from '../../interfaces/projectDetails';
interface Props {
  displayBlock?: boolean;
  milestone?: ProjectMileStone;
}

const TaskDetail = ({ displayBlock, milestone }: Props) => {
  return (
    <Box
      m='20px 0 40px'
      pos='relative'
      _after={{
        content: "''",
        width: '100%',
        height: '100%',
        display: `${displayBlock ? 'block' : 'none'}`,
        pos: 'absolute',
        top: '0',
        left: '0',
        backgroundColor: 'white',
        opacity: '50%',
      }}
    >
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
          <Text>{milestone?.name}</Text>
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
          <Flex
            alignItems='center'
            justifyContent='space-between'
            flexBasis={['55%', null, null, '50%', null, '45%']}
          >
            <Flex alignItems='center'>
              <Progress
                value={
                  milestone?.budget &&
                  percentage(milestone?.logTime, milestone?.budget)
                }
                w={['80px', '100px', '120px', '150px', '200px']}
                rounded='full'
                size='sm'
                bg='white'
              />
              <Text pl='10px'>
                {milestone?.budget &&
                  percentage(milestone?.logTime, milestone?.budget)}
                %
              </Text>
            </Flex>
            <Text>
              <HiDotsHorizontal />
            </Text>
          </Flex>
        </Flex>
      </Flex>
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
      <Accordion
        allowToggle
        borderLeft='1px'
        borderRight='1px'
        borderColor='borderColor'
        allowMultiple
      >
        {milestone?.users?.map((user: ProjectUser, i: number) => {
          const updateDateFormat = 'dd MMM yyyy';
          const sortByLastUpdated =
            user?.timecards?.length > 0 && user?.timecards?.length > 1
              ? user.timecards
                  .sort((a: ProjectActivity, b: ProjectActivity) =>
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
            user && (
              <AccordionItem key={i}>
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
                          <Text textAlign='left'>{user?.name}</Text>
                        </Box>
                      </Flex>
                      <Text flexBasis={'10%'} textAlign={'right'}>
                        {convertMinutes(user?.logTime)}
                      </Text>
                      <Text flexBasis={'17%'} textAlign={'right'}>
                        {formatUpdatedDate}
                      </Text>
                    </AccordionButton>
                    <AccordionPanel p={0}>
                      <List>
                        {user?.timecards?.length > 1 ? (
                          user.timecards
                            ?.sort((a: ProjectActivity, b: ProjectActivity) =>
                              a.date.localeCompare(b.date),
                            )
                            ?.map((activity: ProjectActivity) => (
                              <UserRow
                                key={activity.timecardId}
                                activity={activity}
                              />
                            ))
                        ) : (
                          <UserRow activity={user?.timecards[0]} />
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
  );
};

export default TaskDetail;
