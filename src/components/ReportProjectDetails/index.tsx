import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import { ReactComponent as EditSvg } from '../../assets/images/editTimeCardSVG.svg';
import { ReactComponent as PlusSvg } from '../../assets/images/plusSvg.svg';
import { ReactComponent as MinusSvg } from '../../assets/images/minusSvg.svg';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { getTimeInHours } from '../../utils/common';

const ReportProjectDetails = ({ usersData }: any) => {
  return (
    <Box>
      <Accordion
        allowToggle
        borderLeft='1px'
        borderRight='1px'
        borderColor='borderColor'
      >
        {usersData &&
          usersData.map((user: any, index: number) => {
            return (
              <AccordionItem key={index}>
                {({ isExpanded }) => (
                  <>
                    <h2>
                      <AccordionButton
                        p='15px 50px 15px 80px'
                        display='flex'
                        justifyContent='space-between'
                        color='grayLight'
                        bg={isExpanded ? 'accordianChildBg' : ''}
                        fontSize='14px'
                        textStyle='sourceSansProRegular'
                        lineHeight='17.6px'
                        _focus={{
                          outline: 'none',
                          borderBottom: '0',
                        }}
                        _hover={{
                          backgroundColor: `${
                            isExpanded ? 'accordianChildBg' : ''
                          }`,
                        }}
                      >
                        <Flex>
                          <Box mr='10px'>
                            {isExpanded ? <MinusSvg /> : <PlusSvg />}
                          </Box>
                          <Box>
                            <Text
                              color={isExpanded ? 'white' : 'grayLight'}
                              textStyle={
                                isExpanded
                                  ? 'sourceSansProBold'
                                  : 'sourceSansProRegular'
                              }
                              fontSize='14px'
                              lineHeight='17.6px'
                            >
                              {user.name}
                            </Text>
                          </Box>
                        </Flex>
                        <Box>
                          <Text
                            color={isExpanded ? 'white' : 'grayLight'}
                            textStyle={
                              isExpanded
                                ? 'sourceSansProBold'
                                : 'sourceSansProRegular'
                            }
                          >
                            {getTimeInHours(user.logTime)}
                          </Text>
                        </Box>
                      </AccordionButton>
                    </h2>
                    <AccordionPanel p={0}>
                      {user.timecards.map((timecard: any, index: number) => {
                        return (
                          <Flex
                            key={index}
                            p='10px 50px 10px 80px'
                            borderTop='1px'
                            borderColor='borderColor'
                            bg='accordianBg'
                            color='textColor'
                            fontSize='14px'
                            textStyle='sourceSansProRegular'
                            lineHeight='17.6px'
                            alignItems='center'
                            justifyContent='space-between'
                          >
                            <Flex alignItems='center' flexBasis='27%'>
                              <Tooltip label='Edit'>
                                <Text _hover={{ textDecor: 'underline' }}>
                                  <Link to={`/dashboard/${timecard.id}`}>
                                    <EditSvg />
                                  </Link>
                                </Text>
                              </Tooltip>
                              <Text pl='10px'>
                                {format(
                                  new Date(timecard.date),
                                  'EEEE, LLLL dd yyyy',
                                )}
                              </Text>
                            </Flex>
                            <Text flexBasis='62%'>{timecard.comments}</Text>
                            <Text flexBasis='10%' textAlign='right'>
                              {getTimeInHours(timecard.logTime)}
                            </Text>
                          </Flex>
                        );
                      })}
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

export default ReportProjectDetails;
