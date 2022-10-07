import React, { useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactComponent as EditSvg } from '../../assets/images/editTimeCardSVG.svg';
import { ReactComponent as PlusSvg } from '../../assets/images/plusSvg.svg';
import { ReactComponent as MinusSvg } from '../../assets/images/minusSvg.svg';
import { minutesToDecimal } from '../../utils/common';
import { DrawerContainer } from '../drawer';
import EditTimecardReport from '../EditTimecardReport';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
const PeopleReportsProjectsAccordion = ({ projects }: any) => {
  const {
    profile: { role },
  } = useSelector((state: RootState) => state.rootSlices.user);
  const [timeLogId, setTimeLogId] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const editTimeCard = (id: string) => {
    onOpen();
    setTimeLogId(id);
  };

  return (
    <Box>
      {Array.isArray(projects) &&
        projects.length > 0 &&
        projects.map((project: any, index: number) => {
          return (
            <Accordion
              key={index}
              allowToggle
              borderLeft='none'
              borderRight='none'
              borderTop='0 transparent'
              allowMultiple
            >
              <AccordionItem>
                {({ isExpanded }) => (
                  <Box>
                    <h2>
                      <AccordionButton
                        p='15px 50px 15px 60px'
                        mt='-1px'
                        display='flex'
                        justifyContent='space-between'
                        color='grayLight'
                        outline='none'
                        fontSize='14px'
                        bg={isExpanded ? 'accordianChildBg' : ''}
                        textStyle='sourceSansProRegular'
                        lineHeight='17.6px'
                        _hover={{
                          backgroundColor: `${
                            isExpanded ? 'accordianChildBg' : ''
                          }`,
                        }}
                        _focus={{
                          outline: 'none',
                          borderBottom: '0',
                          borderTop: 'none',
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
                              {project.name}
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
                            {minutesToDecimal(project.logTime)}
                          </Text>
                        </Box>
                      </AccordionButton>
                    </h2>
                    <AccordionPanel p={0}>
                      {project.timecards.map((timecard: any, index: number) => {
                        return (
                          <Flex
                            key={index}
                            p='10px 50px 10px 90px'
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
                              {role === 'ADMIN' && (
                                <Tooltip label='Edit'>
                                  <Text
                                    _hover={{ textDecor: 'underline' }}
                                    onClick={() => editTimeCard(timecard.id)}
                                    cursor='pointer'
                                  >
                                    <EditSvg />
                                  </Text>
                                </Tooltip>
                              )}
                              <Text pl={role === 'ADMIN' ? '10px' : '30px'}>
                                {format(
                                  new Date(timecard.date),
                                  'EEEE, LLLL dd yyyy',
                                )}
                              </Text>
                            </Flex>
                            <Text flexBasis='62%'>{timecard.comments}</Text>
                            <Text flexBasis='10%' textAlign='right'>
                              {minutesToDecimal(timecard.logTime)}
                            </Text>
                          </Flex>
                        );
                      })}
                    </AccordionPanel>
                  </Box>
                )}
              </AccordionItem>
            </Accordion>
          );
        })}
      <DrawerContainer isOpen={isOpen} onClose={onClose}>
        <EditTimecardReport timeLogId={timeLogId} onClose={onClose} />
      </DrawerContainer>
    </Box>
  );
};

export default PeopleReportsProjectsAccordion;
