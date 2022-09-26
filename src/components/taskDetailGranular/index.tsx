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
import React, { useRef } from 'react';
import { format } from 'date-fns';
import { ReactComponent as PlusSvg } from './../../assets/images/plusSvg.svg';
import { ReactComponent as MinusDarkSvg } from './../../assets/images/minusdark.svg';

import {
  ProjectActivity,
  ProjectMileStone,
  ProjectTask,
  ProjectUser,
} from '../../interfaces/projectDetails';
import { convertMinutes, createPdfTitle, percentage } from '../../utils/common';
import ExportMilestone from '../ExportMilestone';
import UserRow from '../taskDetail/userRow';
import usePrintHook from '../../hooks/usePrintHook';
import PrintMileStoneGranular from '../PrintPage/PrintMileStoneGranular';

interface Props {
  milestone?: ProjectMileStone;
  projectBasics: any;
  displayBlock?: boolean;
}

const TaskDetailGranular = ({
  milestone,
  displayBlock,
  projectBasics,
}: Props) => {
  const componentRef = useRef(null);

  const docTitle = createPdfTitle(projectBasics?.projectName, milestone?.name);

  const [isPrinting, handlePrint] = usePrintHook({
    componentRef,
    docTitle,
  });

  const clickHandle = () => handlePrint();

  return (
    <Box>
      <Box m='14px 0 40px'>
        <Box className='wrapper'>
          <Flex
            width='full'
            p='13px 25px'
            alignItems='center'
            justifyContent='space-between'
            bg='purple'
            color='white'
            fontSize='14px'
            textStyle='sourceSansProRegular'
            lineHeight='17.6px'
          >
            <Flex justifyContent='space-between' flexBasis='50%'>
              <Text textTransform='capitalize'>{milestone?.title}</Text>
              <Text>
                Budget -{' '}
                {milestone?.budget && convertMinutes(milestone?.budget)}
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
                Actual -{' '}
                {milestone?.logTime && convertMinutes(milestone?.logTime)} Hrs
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
                  <Text pl='5px'>
                    {milestone?.budget &&
                      percentage(milestone?.logTime, milestone?.budget)}
                    %
                  </Text>
                </Flex>
                <ExportMilestone handlePrint={clickHandle} />
              </Flex>
            </Flex>
          </Flex>
          <Accordion
            borderLeft='1px'
            borderRight='1px'
            borderColor='borderColor'
            allowMultiple
          >
            {milestone?.tasks ? (
              milestone?.tasks?.map((task: ProjectTask, id: number) => {
                return (
                  <AccordionItem key={id}>
                    {({ isExpanded }) => (
                      <>
                        <h2>
                          <AccordionButton
                            p='15px 4% 15px 2%'
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
                              <Box mr='10px' color='borderDark'>
                                {isExpanded ? <MinusDarkSvg /> : <PlusSvg />}
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
                            bg='#f5f5f5'
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
                              borderLeft={'1px'}
                              borderRight={'1px'}
                              borderColor='borderColor'
                              allowMultiple
                            >
                              {task?.users ? (
                                task?.users?.map(
                                  (user: ProjectUser, id: number) => {
                                    const updateDateFormat = 'dd MMM yyyy';
                                    const sortByLastUpdated =
                                      user?.timecards?.length > 0 &&
                                      user?.timecards?.length > 1
                                        ? user.timecards
                                            .sort(
                                              (
                                                a: ProjectActivity,
                                                b: ProjectActivity,
                                              ) =>
                                                a.updateAt.localeCompare(
                                                  b.updateAt,
                                                ),
                                            )
                                            .reverse()
                                        : user.timecards;
                                    const formatUpdatedDate =
                                      user.timecards.length > 0
                                        ? format(
                                            new Date(
                                              sortByLastUpdated[0]?.updateAt,
                                            ),
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
                                                    mr='10px'
                                                    color='borderDark'
                                                  >
                                                    {isExpanded ? (
                                                      <MinusDarkSvg />
                                                    ) : (
                                                      <PlusSvg />
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
                                                  {convertMinutes(
                                                    user?.logTime,
                                                  )}
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
                                                  {user?.timecards?.length >
                                                  1 ? (
                                                    user.timecards
                                                      ?.sort(
                                                        (
                                                          a: ProjectActivity,
                                                          b: ProjectActivity,
                                                        ) =>
                                                          a.date.localeCompare(
                                                            b.date,
                                                          ),
                                                      )
                                                      ?.map(
                                                        (
                                                          activity: ProjectActivity,
                                                        ) => (
                                                          <UserRow
                                                            key={
                                                              activity.timecardId
                                                            }
                                                            activity={activity}
                                                          />
                                                        ),
                                                      )
                                                  ) : (
                                                    <UserRow
                                                      activity={
                                                        user?.timecards[0]
                                                      }
                                                    />
                                                  )}
                                                </List>
                                              </AccordionPanel>
                                            </>
                                          )}
                                        </AccordionItem>
                                      )
                                    );
                                  },
                                )
                              ) : (
                                <Box
                                  p='12px 32px'
                                  borderBottom='1px'
                                  borderColor='borderColor'
                                >
                                  <Text>No data found.</Text>
                                </Box>
                              )}
                            </Accordion>
                          </Box>
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                );
              })
            ) : (
              <Box p='12px 32px' borderBottom='1px' borderColor='borderColor'>
                <Text>No data found.</Text>
              </Box>
            )}
          </Accordion>
        </Box>
      </Box>
      {/* // for printing only */}
      {isPrinting && (
        <PrintMileStoneGranular
          displayBlock={displayBlock}
          milestone={milestone}
          projectBasics={projectBasics}
          isPrinting={isPrinting}
          ref={componentRef}
        />
      )}
    </Box>
  );
};

export default TaskDetailGranular;
