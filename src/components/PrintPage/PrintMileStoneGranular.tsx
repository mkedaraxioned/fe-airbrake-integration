import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  forwardRef,
  Heading,
  List,
  Progress,
  Text,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { LegacyRef } from 'react';
import {
  ProjectActivity,
  ProjectTask,
  ProjectUser,
} from '../../interfaces/projectDetails';
import {
  convertMinutes,
  getIndexesBasedOnValues,
  percentage,
} from '../../utils/common';
import UserRow from '../taskDetail/userRow';

interface Props {
  milestone: any;
  projectBasics: any;
  displayBlock?: boolean;
  isPrinting?: boolean;
}

const PrintMileStoneGranular = forwardRef(
  (
    { milestone, projectBasics, isPrinting }: Props,
    ref: LegacyRef<HTMLDivElement> | undefined,
  ) => {
    return (
      <Box display='none' className='printing'>
        <Box m='20px 0 40px' ref={ref}>
          <Box className='wrapper'>
            {isPrinting && (
              <Box mb='40px'>
                <Text
                  fontSize='14px'
                  color='textGray'
                  textStyle='sourceSansProRegular'
                  lineHeight='17.6px'
                >
                  {projectBasics?.clientName}
                </Text>
                <Heading
                  as='h2'
                  m='0 !important'
                  color='textColor'
                  textStyle='sourceSansProBold'
                  fontSize='22px'
                  lineHeight='27.65px'
                >
                  {projectBasics?.projectName}
                </Heading>
              </Box>
            )}
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
                </Flex>
              </Flex>
            </Flex>
            <Accordion
              borderLeft='1px'
              borderRight='1px'
              borderColor='borderColor'
              allowMultiple
              index={
                isPrinting
                  ? getIndexesBasedOnValues(milestone?.tasks)
                  : undefined
              }
            >
              {milestone?.tasks?.map((task: ProjectTask, id: number) => {
                return (
                  <AccordionItem key={id}>
                    {() => (
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
                          </Flex>
                          <Box>
                            <Accordion
                              borderLeft={isPrinting ? '1px solid #000' : '1px'}
                              borderRight={
                                isPrinting ? '1px solid #000' : '1px'
                              }
                              borderColor='borderColor'
                              allowMultiple
                              index={
                                isPrinting
                                  ? getIndexesBasedOnValues(task?.users)
                                  : undefined
                              }
                            >
                              {task?.users?.map(
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
                                        {() => (
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
                                            </AccordionButton>
                                            <AccordionPanel p={0}>
                                              <List>
                                                {user?.timecards?.length > 1 ? (
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
                                                          isPrinting={
                                                            isPrinting
                                                          }
                                                        />
                                                      ),
                                                    )
                                                ) : (
                                                  <UserRow
                                                    activity={
                                                      user?.timecards[0]
                                                    }
                                                    isPrinting={isPrinting}
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
                              )}
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
        </Box>
      </Box>
    );
  },
);

export default PrintMileStoneGranular;
