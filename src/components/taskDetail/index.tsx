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
interface Props {
  displayBlock?: boolean;
  milestone?: any;
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
          <Text>Budget - {convertMinutes(milestone?.budget)}</Text>
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
          <Text>Actual - {convertMinutes(milestone?.logTime)} Hrs</Text>
          <Flex alignItems='center'>
            <Flex alignItems='center'>
              <Progress
                value={percentage(milestone?.logTime, milestone?.budget)}
                w={['80px', '100px', '100px', '150px', '200px']}
                rounded='full'
                size='sm'
                colorScheme='green'
                bg='white'
              />
              <Text pl='5px'>
                {percentage(milestone?.logTime, milestone?.budget)}%
              </Text>
            </Flex>
            <Text pl='43px'>
              <HiDotsHorizontal />
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        p='8px 26px'
        justifyContent='space-between'
        bg='bgGray'
        color='grayLight'
        fontSize='14px'
        textStyle='sourceSansProBold'
        lineHeight='17.6px'
      >
        <Text flexBasis='25%'>Name</Text>
        <Text flexBasis='45%'>Comments/Notes</Text>
        <Text flexBasis='13%' textAlign={'right'}>
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
      >
        {milestone?.users.map((user: any, i: any) => {
          const updateDateFormat = 'dd MMM yyyy';
          const sortByLastUpdated =
            user?.timecards?.length > 1
              ? user.timecards
                  .sort((a: any, b: any) =>
                    a.updateAt.localeCompare(b.updateAt),
                  )
                  .reverse()
              : user.timecards;
          const formatUpdatedDate = format(
            new Date(sortByLastUpdated[0].updateAt),
            updateDateFormat,
          );

          return (
            user && (
              <AccordionItem key={i}>
                {({ isExpanded }) => (
                  <>
                    <AccordionButton
                      p='15px 26px'
                      display='flex'
                      justifyContent='space-between'
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
                      <Flex flexBasis={'70%'}>
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
                      <Text flexBasis={'13%'} textAlign={'right'}>
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
                            ?.sort((a: any, b: any) =>
                              a.date.localeCompare(b.date),
                            )
                            ?.map((activity: any) => (
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
