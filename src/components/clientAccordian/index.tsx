import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { ReactComponent as PlusSvg } from '../../assets/images/plusSvg.svg';
import { ReactComponent as MinusSvg } from '../../assets/images/minusSvg.svg';
import ReportProjectDetails from '../ReportProjectDetails';
import { getTimeInHours } from '../../utils/common';

const ClientAccordian = ({ projects }: any) => {
  return (
    <Box>
      <Accordion
        allowToggle
        borderLeft='1px'
        borderRight='1px'
        borderColor='borderColor'
      >
        {projects?.map((project: any, index: number) => {
          return (
            <AccordionItem key={index}>
              {({ isExpanded }) => (
                <Box>
                  <h2>
                    <AccordionButton
                      p='15px 50px'
                      display='flex'
                      justifyContent='space-between'
                      color='grayLight'
                      fontSize='14px'
                      bg={isExpanded ? 'accordianParentBg' : ''}
                      textStyle='sourceSansProRegular'
                      lineHeight='17.6px'
                      _hover={{
                        backgroundColor: `${
                          isExpanded ? 'accordianParentBg' : ''
                        }`,
                      }}
                      _focus={{
                        outline: 'none',
                        borderBottom: '0',
                      }}
                    >
                      <Flex>
                        <Box mr='10px'>
                          {isExpanded ? (
                            <MinusSvg fontSize='10px' />
                          ) : (
                            <PlusSvg fontSize='10px' />
                          )}
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
                          {getTimeInHours(project.logTime)}
                        </Text>
                      </Box>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel p={0}>
                    <Box>
                      <ReportProjectDetails usersData={project.users} />
                    </Box>
                  </AccordionPanel>
                </Box>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </Box>
  );
};

export default ClientAccordian;
