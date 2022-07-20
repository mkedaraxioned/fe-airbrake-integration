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
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ClientAccordian = () => {
  return (
    <Box>
      <Accordion
        allowToggle
        borderLeft='1px'
        borderRight='1px'
        borderColor='borderColor'
      >
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton
                  pt='15px'
                  pb='15px'
                  pl='25px'
                  display='flex'
                  justifyContent='space-between'
                  color='textLightMid'
                  fontSize='14px'
                  textStyle='sourceSansProRegular'
                  lineHeight='17.6px'
                  _focus={{
                    outline: 'none',
                    borderBottom: '0',
                  }}
                >
                  <Flex>
                    <Box
                      padding='2px 1px 1px '
                      border='2px'
                      borderColor='borderDark'
                      mr='10px'
                      color='borderDark'
                    >
                      {isExpanded ? (
                        <FaMinus fontSize='10px' />
                      ) : (
                        <FaPlus fontSize='10px' />
                      )}
                    </Box>
                    <Box>
                      <Text textAlign='left'>Axioned</Text>
                    </Box>
                  </Flex>
                  <Box pr='10%'>
                    <Text>25:00</Text>
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel p={0}>
                <Flex
                  p='7px 50px'
                  borderTop='1px'
                  borderColor='borderColor'
                  justifyContent='space-between'
                  bg='bgGrayLight'
                  color='textLightMid'
                  fontSize='13px'
                  fontWeight='600'
                  lineHeight='16.34px'
                >
                  <Text>Project</Text>
                  <Text pr='5.5%'>Time entered</Text>
                </Flex>
                <Flex
                  p='15px 50px'
                  borderTop='1px'
                  borderColor='borderColor'
                  color='textLightMid'
                  fontSize='14px'
                  textStyle='sourceSansProRegular'
                  lineHeight='17.6px'
                  justifyContent='space-between'
                >
                  <Text _hover={{ textDecor: 'underline' }}>
                    <Link to='/'>Axioned Website</Link>
                  </Text>
                  <Text pr='7.8%'>5:00</Text>
                </Flex>
                <Flex
                  p='15px 50px'
                  borderTop='1px'
                  borderColor='borderColor'
                  color='textLightMid'
                  fontSize='14px'
                  textStyle='sourceSansProRegular'
                  lineHeight='17.6px'
                  justifyContent='space-between'
                >
                  <Text _hover={{ textDecor: 'underline' }}>
                    <Link to='/'>Engineering</Link>
                  </Text>
                  <Text pr='7.8%'>5:00</Text>
                </Flex>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton
                  pt='15px'
                  pb='15px'
                  pl='25px'
                  display='flex'
                  justifyContent='space-between'
                  color='textLightMid'
                  fontSize='14px'
                  textStyle='sourceSansProRegular'
                  lineHeight='17.6px'
                  _focus={{
                    outline: 'none',
                    borderBottom: '0',
                  }}
                >
                  <Flex>
                    <Box
                      padding='2px 1px 1px '
                      border='2px'
                      borderColor='borderDark'
                      mr='10px'
                      color='borderDark'
                    >
                      {isExpanded ? (
                        <FaMinus fontSize='10px' />
                      ) : (
                        <FaPlus fontSize='10px' />
                      )}
                    </Box>
                    <Box>
                      <Text textAlign='left'>Axioned</Text>
                    </Box>
                  </Flex>
                  <Box pr='10%'>
                    <Text>25:00</Text>
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel p={0}>
                <Flex
                  p='7px 50px'
                  borderTop='1px'
                  borderColor='borderColor'
                  justifyContent='space-between'
                  bg='bgGrayLight'
                  color='textLightMid'
                  fontSize='13px'
                  fontWeight='600'
                  lineHeight='16.34px'
                >
                  <Text>Project</Text>
                  <Text pr='5.5%'>Time entered</Text>
                </Flex>
                <Flex
                  p='15px 50px'
                  borderTop='1px'
                  borderColor='borderColor'
                  color='textLightMid'
                  fontSize='14px'
                  textStyle='sourceSansProRegular'
                  lineHeight='17.6px'
                  justifyContent='space-between'
                >
                  <Text _hover={{ textDecor: 'underline' }}>
                    <Link to='/'>Axioned Website</Link>
                  </Text>
                  <Text pr='7.8%'>5:00</Text>
                </Flex>
                <Flex
                  p='15px 50px'
                  borderTop='1px'
                  borderColor='borderColor'
                  color='textLightMid'
                  fontSize='14px'
                  textStyle='sourceSansProRegular'
                  lineHeight='17.6px'
                  justifyContent='space-between'
                >
                  <Text _hover={{ textDecor: 'underline' }}>
                    <Link to='/'>Engineering</Link>
                  </Text>
                  <Text pr='7.8%'>5:00</Text>
                </Flex>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default ClientAccordian;
