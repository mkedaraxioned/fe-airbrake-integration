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
import React, { LegacyRef } from 'react';
import { ProjectActivity, ProjectUser } from '../../interfaces/projectDetails';
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

const PrintMileStone = forwardRef(
  (
    { milestone, projectBasics, displayBlock, isPrinting }: Props,
    ref: LegacyRef<HTMLDivElement> | undefined,
  ) => {
    return (
      <Box display='none'>
        <Box
          ref={ref}
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
                </Flex>
              </Flex>
            </Flex>
            <Flex
              p='8px 30px 8px 24px'
              justifyContent='space-between'
              bg='bgGray'
              color='grayLight'
              fontSize='14px'
              textStyle='sourceSansProBold'
              lineHeight='17.6px'
            >
              <Text flexBasis='20%'>Name</Text>
              <Text flexBasis='60%'>Comments/Notes</Text>
              <Text flexBasis='10%' textAlign={'right'}>
                Hours
              </Text>
            </Flex>
            <Accordion
              allowToggle
              borderLeft={isPrinting ? '1px solid #000' : '1px'}
              borderRight={isPrinting ? '1px solid #000' : '1px'}
              borderColor='borderColor'
              allowMultiple
              defaultIndex={
                milestone?.users
                  ? getIndexesBasedOnValues(milestone?.users)
                  : undefined
              }
            >
              {milestone?.users ? (
                milestone?.users?.map((user: ProjectUser, i: number) => {
                  return (
                    user && (
                      <AccordionItem key={i}>
                        {() => (
                          <>
                            <AccordionButton
                              p='15px 30px 15px 24px'
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
                                  <Text
                                    textAlign='left'
                                    textStyle='sourceSansProBold'
                                  >
                                    {user?.name}
                                  </Text>
                                </Box>
                              </Flex>
                              <Text
                                flexBasis={'10%'}
                                textAlign={'right'}
                                textStyle='sourceSansProBold'
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
                                      ) => a.date.localeCompare(b.date),
                                    )
                                    ?.map((activity: ProjectActivity) => (
                                      <UserRow
                                        key={activity.timecardId}
                                        activity={activity}
                                        isPrinting={isPrinting}
                                      />
                                    ))
                                ) : (
                                  <UserRow
                                    activity={user?.timecards[0]}
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
                })
              ) : (
                <Box
                  p='12px 32px'
                  border='1px solid #000'
                  borderTop='none'
                  borderColor='borderColor'
                >
                  <Text>No data found.</Text>
                </Box>
              )}
            </Accordion>
          </Box>
        </Box>
      </Box>
    );
  },
);

export default PrintMileStone;
