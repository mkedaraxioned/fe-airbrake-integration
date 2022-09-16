import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { getTimeInHours } from '../../utils/common';
import { ReactComponent as PlusSvg } from '../../assets/images/plusSvg.svg';
import { ReactComponent as MinusSvg } from '../../assets/images/minusSvg.svg';
import PeopleReportsProjectsAccordion from '../peopleReportsProjectsAccordion';

const PeopleAccordian = ({ user }: any) => {
  return (
    <Box>
      <Accordion
        allowToggle
        borderLeft='1px'
        borderRight='1px'
        borderColor='borderColor'
        borderTop='0 transparent'
        allowMultiple
      >
        <AccordionItem>
          {({ isExpanded }) => (
            <Box>
              <h2>
                <AccordionButton
                  p='15px 50px 15px 32px'
                  mt='-1px'
                  display='flex'
                  justifyContent='space-between'
                  color='grayLight'
                  fontSize='14px'
                  outline='none'
                  bg={isExpanded ? 'accordianParentBg' : ''}
                  textStyle='sourceSansProRegular'
                  lineHeight='17.6px'
                  borderBottom='0'
                  _hover={{
                    backgroundColor: `${isExpanded ? 'accordianParentBg' : ''}`,
                  }}
                  _focus={{
                    outline: 'none',
                    borderBottom: '0',
                  }}
                >
                  <Flex>
                    <Box mr='8px'>
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
                {user.clients.map((client: any, index: number) => {
                  return (
                    <Box key={index}>
                      <Flex
                        justifyContent='space-between'
                        p='8px 50px 8px 60px'
                        bg='bgGray'
                      >
                        <Text
                          color='grayLight'
                          textStyle='sourceSansProBold'
                          fontSize='14px'
                          lineHeight='17.6px'
                        >
                          {client.name}
                        </Text>
                        <Text
                          color='grayLight'
                          textStyle='sourceSansProBold'
                          fontSize='14px'
                          lineHeight='17.6px'
                        >
                          {getTimeInHours(client.logTime)}
                        </Text>
                      </Flex>
                      <PeopleReportsProjectsAccordion
                        projects={client.projects}
                      />
                    </Box>
                  );
                })}
              </AccordionPanel>
            </Box>
          )}
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default PeopleAccordian;
