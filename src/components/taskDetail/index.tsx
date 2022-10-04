import React, { useRef, useState } from 'react';
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
  useDisclosure,
} from '@chakra-ui/react';
import { ReactComponent as PlusSvg } from './../../assets/images/plusSvg.svg';
import { ReactComponent as MinusDarkSvg } from './../../assets/images/minusdark.svg';
import './taskDetail.modules.css';
import UserRow from './userRow';
import { convertMinutes, createPdfTitle, percentage } from '../../utils/common';
import { format } from 'date-fns';

import {
  ProjectActivity,
  ProjectMileStone,
  ProjectUser,
} from '../../interfaces/projectDetails';
import ExportMilestone from '../ExportMilestone';
import usePrintHook from '../../hooks/usePrintHook';
import PrintMileStone from '../PrintPage/PrintMileStone';
import { DrawerContainer } from '../drawer';
import EditTimecardReport from '../EditTimecardReport';

interface Props {
  displayBlock?: boolean;
  milestone?: ProjectMileStone;
  projectBasics?: any;
}

const TaskDetail = ({ displayBlock, milestone, projectBasics }: Props) => {
  const [timeLogId, setTimeLogId] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const componentRef = useRef(null);
  const docTitle = createPdfTitle(projectBasics?.projectName, milestone?.name);

  const [isPrinting, handlePrint] = usePrintHook({
    componentRef,
    docTitle,
  });

  const clickHandle = () => handlePrint();

  return (
    <Box>
      <Box
        m='14px 0 40px'
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
        <Box className='wrapper'>
          <Flex
            width='full'
            p='13px 25px'
            alignItems='center'
            justifyContent='space-between'
            bg='purple'
            color='white'
            fontSize='16px'
            textStyle='sourceSansProRegular'
            lineHeight='17.6px'
          >
            <Flex justifyContent='space-between' flexBasis='50%'>
              <Text textTransform='capitalize'>{milestone?.name}</Text>
              <Text>
                Budget -{' '}
                {milestone?.budget
                  ? convertMinutes(milestone?.budget)
                  : '00:00'}
              </Text>
            </Flex>
            <Divider
              ml='16px'
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
                Actual -{' '}
                {milestone?.logTime
                  ? convertMinutes(milestone?.logTime)
                  : '00:00'}{' '}
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
                    colorScheme='green'
                    bg='white'
                  />
                  <Text pl='10px'>
                    {milestone?.budget
                      ? percentage(milestone?.logTime, milestone?.budget)
                      : '0'}
                    %
                  </Text>
                </Flex>
                <ExportMilestone handlePrint={clickHandle} />
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
            <Text flexBasis='29%'>Name</Text>
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
            borderLeft={'1px'}
            borderRight={'1px'}
            borderColor='borderColor'
            allowMultiple
          >
            {milestone?.users ? (
              milestone?.users?.map((user: ProjectUser, i: number) => {
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
                              <Box mr='10px' color='borderDark'>
                                {isExpanded ? <MinusDarkSvg /> : <PlusSvg />}
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
                                  ?.sort(
                                    (a: ProjectActivity, b: ProjectActivity) =>
                                      a.date.localeCompare(b.date),
                                  )
                                  ?.map((activity: ProjectActivity) => (
                                    <UserRow
                                      key={activity.timecardId}
                                      activity={activity}
                                      onOpen={onOpen}
                                      setTimeLogId={setTimeLogId}
                                    />
                                  ))
                              ) : (
                                <UserRow
                                  activity={user?.timecards[0]}
                                  onOpen={onOpen}
                                  setTimeLogId={setTimeLogId}
                                />
                              )}
                            </List>
                          </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
                  )
                );
              })
            ) : (
              <Box
                p='12px 30px'
                borderBottom='1px'
                borderColor='borderColor'
                fontSize='16px'
                textStyle='sourceSansProRegular'
                lineHeight='17.6px'
              >
                <Text>No data found.</Text>
              </Box>
            )}
          </Accordion>
        </Box>
      </Box>
      {/* // for printing only */}
      {isPrinting && (
        <PrintMileStone
          displayBlock={displayBlock}
          milestone={milestone}
          projectBasics={projectBasics}
          isPrinting={isPrinting}
          ref={componentRef}
        />
      )}
      <DrawerContainer isOpen={isOpen} onClose={onClose}>
        <EditTimecardReport timeLogId={timeLogId} onClose={onClose} />
      </DrawerContainer>
    </Box>
  );
};

export default TaskDetail;
