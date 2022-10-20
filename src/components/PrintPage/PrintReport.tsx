import { Box, Flex, Text, List, ListItem } from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { forwardRef, LegacyRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { minutesToDecimal } from '../../utils/common';

interface Props {
  printData?: any;
  isPrinting?: boolean;
}

const PrintReport = forwardRef(
  (
    { printData, isPrinting }: Props,
    ref: LegacyRef<HTMLDivElement> | undefined,
  ) => {
    const { users } = useSelector(
      (state: RootState) => state.rootSlices.allUsers,
    );

    return (
      <Box display='none'>
        <Box m='20px 0 40px'>
          {isPrinting && (
            <Box ref={ref} p='20px 0'>
              {printData.data?.map((client: any, index: number) => {
                if (client.logTime === 0) return null;
                return (
                  <Box key={index} className='wrapper'>
                    <Text
                      fontSize='22px'
                      lineHeight='27.65px'
                      color='textColor'
                      textStyle='sourceSansProBold'
                    >{`${client.name} (${minutesToDecimal(
                      client.logTime,
                    )} Hours)`}</Text>
                    <Text
                      color='reportSubTitle'
                      fontSize='14px'
                      lineHeight='17.6px'
                    >{`${format(
                      new Date(printData?.startDate),
                      'MMMM dd, yyyy',
                    )} - ${format(
                      new Date(printData?.endDate),
                      'MMMM dd, yyyy',
                    )}`}</Text>
                    {client.projects.map((project: any, index: number) => {
                      console.log(
                        project,
                        'project',
                        project.client?.name,
                        'project.client?.name',
                      );
                      if (project.logTime === 0) return null;
                      return (
                        <Box m='15px 0 30px' key={index}>
                          <Flex
                            p='13px 53px 13px 28px'
                            color='white'
                            justifyContent='space-between'
                            textStyle='sourceSansProBold'
                            textAlign='left'
                            fontSize='16px'
                            borderTop='1px'
                            borderRight='1px'
                            borderLeft='1px'
                            borderColor='borderColor'
                            bg='accordianChildBg'
                          >
                            <Text lineHeight='20.11px'>
                              {project.title}
                              {project.client?.name && (
                                <Text
                                  color='white'
                                  textStyle='sourceSansProRegular'
                                  as='span'
                                >
                                  {` (${project.client.name})`}
                                </Text>
                              )}
                            </Text>
                            <Text lineHeight='20.11px'>
                              {minutesToDecimal(project.logTime)}
                            </Text>
                          </Flex>
                          {project.milestones.map(
                            (milestone: any, index: number) => {
                              if (milestone.logTime === 0) return null;
                              return (
                                <Box key={index}>
                                  <Flex
                                    p='13px 53px 13px 28px'
                                    color='textColor'
                                    justifyContent='space-between'
                                    textStyle='sourceSansProBold'
                                    textAlign='left'
                                    fontSize='16px'
                                    style={{ border: '1px solid #E2E8F0' }}
                                  >
                                    <Text lineHeight='20.11px'>
                                      {milestone.title}
                                    </Text>
                                    <Text lineHeight='20.11px'>
                                      {minutesToDecimal(milestone.logTime)}
                                    </Text>
                                  </Flex>
                                  {project.type === 'RETAINER_GRANULAR' &&
                                    milestone.tasks.map(
                                      (task: any, index: number) => {
                                        if (task.logTime === 0) return null;
                                        return (
                                          <Box key={index}>
                                            <Flex
                                              p='7px 53px 7px 28px'
                                              border='1px'
                                              borderColor='borderColor'
                                              justifyContent='space-between'
                                              alignItems='center'
                                              bg='borderColor'
                                              color='grayLight'
                                              fontSize='14px'
                                              lineHeight='17.6px'
                                              textStyle='sourceSansProBold'
                                            >
                                              <Text>{task.title}</Text>
                                              <Text>
                                                {minutesToDecimal(task.logTime)}
                                              </Text>
                                            </Flex>
                                            <List className='printReport'>
                                              {task.timecards.map(
                                                (
                                                  timecard: any,
                                                  index: number,
                                                ) => {
                                                  const user = users?.find(
                                                    (user: { id: string }) =>
                                                      user.id ===
                                                      timecard.userId,
                                                  );

                                                  return (
                                                    <ListItem key={index}>
                                                      <Flex
                                                        justifyContent='space-between'
                                                        p='15px 53px 15px 28px'
                                                        color='textLogC'
                                                        fontSize='14px'
                                                      >
                                                        <Text
                                                          lineHeight='17.6px'
                                                          flexBasis='22%'
                                                        >
                                                          {user.name}
                                                        </Text>
                                                        <Text
                                                          lineHeight='17.6px'
                                                          flexBasis='28%'
                                                        >
                                                          {format(
                                                            new Date(
                                                              timecard.date,
                                                            ),
                                                            'EEEE, MMM dd, yyyy',
                                                          )}
                                                        </Text>
                                                        <Text
                                                          lineHeight='17.6px'
                                                          flexBasis='42%'
                                                        >
                                                          {timecard.comments}
                                                        </Text>
                                                        <Text lineHeight='17.6px'>
                                                          {minutesToDecimal(
                                                            timecard.logTime,
                                                          )}
                                                        </Text>
                                                      </Flex>
                                                    </ListItem>
                                                  );
                                                },
                                              )}
                                            </List>
                                          </Box>
                                        );
                                      },
                                    )}
                                  {project.type !== 'RETAINER_GRANULAR' && (
                                    <List className='printReport'>
                                      {milestone.Timecard?.map(
                                        (timecard: any, index: number) => {
                                          return (
                                            <ListItem key={index}>
                                              <Flex
                                                justifyContent='space-between'
                                                p='15px 53px 15px 28px'
                                                color='textLogC'
                                                fontSize='14px'
                                              >
                                                <Text
                                                  lineHeight='17.6px'
                                                  flexBasis='22%'
                                                >
                                                  {timecard.user.name}
                                                </Text>
                                                <Text
                                                  lineHeight='17.6px'
                                                  flexBasis='28%'
                                                >
                                                  {format(
                                                    new Date(timecard.date),
                                                    'EEEE, MMM dd, yyyy',
                                                  )}
                                                </Text>
                                                <Text
                                                  lineHeight='17.6px'
                                                  flexBasis='42%'
                                                >
                                                  {timecard.comments}
                                                </Text>
                                                <Text lineHeight='17.6px'>
                                                  {minutesToDecimal(
                                                    timecard.logTime,
                                                  )}
                                                </Text>
                                              </Flex>
                                            </ListItem>
                                          );
                                        },
                                      )}
                                    </List>
                                  )}
                                </Box>
                              );
                            },
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      </Box>
    );
  },
);

PrintReport.displayName = 'PrintReport';

export default PrintReport;
