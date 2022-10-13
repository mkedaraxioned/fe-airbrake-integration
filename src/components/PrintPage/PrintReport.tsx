import { Box, Flex, Text, List, ListItem } from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { forwardRef, LegacyRef } from 'react';
import { minutesToDecimal } from '../../utils/common';

interface Props {
  filteredData?: any;
  searchQueryValues?: any;
  isPrinting?: boolean;
}

const PrintReport = forwardRef(
  (
    { filteredData, searchQueryValues, isPrinting }: Props,
    ref: LegacyRef<HTMLDivElement> | undefined,
  ) => {
    console.log({ filteredData }, 'filteredData');
    return (
      <Box>
        <Box ref={ref}>
          <Box p='15px 0' className='wrapper'>
            {filteredData.clients.map((client: any, index: number) => {
              return (
                <Box key={index}>
                  <Text
                    fontSize='22px'
                    lineHeight='27.65px'
                    textStyle='sourceSansProBold'
                  >
                    {client.name}
                    <Text
                      as='span'
                      textStyle='sourceSansProRegular'
                    >{` (${minutesToDecimal(client?.logTime)} Hours)`}</Text>
                  </Text>
                  {client.projects?.map((project: any, index: number) => {
                    return (
                      <Box key={index}>
                        <Box>
                          <Flex
                            justifyContent='space-between'
                            textStyle='sourceSansProBold'
                          >
                            <Text
                              fontSize='16px'
                              textAlign='left'
                              lineHeight='20.11px'
                            >
                              {project.name}
                            </Text>
                            <Text
                              fontSize='16px'
                              textAlign='left'
                              lineHeight='20.11px'
                            >{`(${minutesToDecimal(
                              project?.logTime,
                            )} Hours)`}</Text>
                          </Flex>
                          <Box pb={4}>
                            {project.users.map((user: any, index: number) => {
                              return (
                                <Box key={index}>
                                  <Box>
                                    <Text>{user.name}</Text>

                                    <List>
                                      {user.timecards.map(
                                        (timecard: any, index: number) => {
                                          console.log(timecard, 'timecard');
                                          return (
                                            <ListItem key={index}>
                                              <Flex
                                                justifyContent='space-between'
                                                textAlign='left'
                                              >
                                                <Text>{user.name}</Text>
                                                <Text>
                                                  {format(
                                                    new Date(timecard.date),
                                                    'yyyy MM dd',
                                                  )}
                                                </Text>
                                                <Text>{timecard.comments}</Text>
                                                <Text>
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
                                </Box>
                              );
                            })}
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    );
  },
);

PrintReport.displayName = 'PrintReport';

export default PrintReport;
