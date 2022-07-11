import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Progress,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';

const TaskDetailGranular = () => {
  return (
    <Box m='20px 0 40px'>
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
          <Text>Retainer Month: 14th May- 13th June</Text>
          <Text>Budget - 2.5</Text>
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
          <Text>Actual - 2.5 Hrs</Text>
          <Flex alignItems='center'>
            <Flex alignItems='center'>
              <Progress
                value={80}
                w='200px'
                rounded='full'
                size='sm'
                colorScheme='green'
                bg='white'
              />
              <Text pl='5px'>80%</Text>
            </Flex>
            <Text pl='43px'>
              <HiDotsHorizontal />
            </Text>
          </Flex>
        </Flex>
      </Flex>
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
                  pt='14px'
                  pb='14px'
                  pl='25px'
                  display='flex'
                  justifyContent='space-between'
                  bg='purpleLight'
                  color='textLightMid'
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
                      <Text textAlign='left'>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </Text>
                    </Box>
                  </Flex>
                </AccordionButton>
              </h2>
              <AccordionPanel p='0'>
                <Flex
                  p='8px 26px'
                  justifyContent='space-between'
                  bg='bgGray'
                  color='textLightMid'
                  fontSize='14px'
                  textStyle='sourceSansProBold'
                  lineHeight='17.6px'
                >
                  <Flex flexBasis='50%'>
                    <Text>Name</Text>
                    <Text ml='18%'>Comments/Notes</Text>
                  </Flex>
                  <Flex pl='16px' flexBasis='50%'>
                    <Text>Hours</Text>
                    <Text ml='48%'>Last updated date</Text>
                  </Flex>
                </Flex>
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
                              pt='14px'
                              pb='14px'
                              pl='25px'
                              display='flex'
                              justifyContent='space-between'
                              color='textLightMid'
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
                                  <Text textAlign='left'>Shritej B</Text>
                                </Box>
                              </Flex>
                              <Box pl='23%'>
                                <Text>2.5 Hrs</Text>
                              </Box>
                              <Box pr='15.4%'>
                                <Text>22 January 2022</Text>
                              </Box>
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                          </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
                    <AccordionItem>
                      {({ isExpanded }) => (
                        <>
                          <h2>
                            <AccordionButton
                              pt='14px'
                              pb='14px'
                              pl='25px'
                              display='flex'
                              justifyContent='space-between'
                              color='textLightMid'
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
                                  <Text textAlign='left'>Shritej B</Text>
                                </Box>
                              </Flex>
                              <Box pl='23%'>
                                <Text>2.5 Hrs</Text>
                              </Box>
                              <Box pr='15.4%'>
                                <Text>22 January 2022</Text>
                              </Box>
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                          </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
                  </Accordion>
                </Box>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton
                  pt='14px'
                  pb='14px'
                  pl='25px'
                  display='flex'
                  justifyContent='space-between'
                  bg='purpleLight'
                  color='textLightMid'
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
                      <Text textAlign='left'>
                        There are many variations of passages of Lorem Ipsum
                        available.
                      </Text>
                    </Box>
                  </Flex>
                </AccordionButton>
              </h2>
              <AccordionPanel p='0'>
                <Flex
                  p='8px 26px'
                  justifyContent='space-between'
                  bg='bgGray'
                  color='textLightMid'
                  fontSize='14px'
                  textStyle='sourceSansProBold'
                  lineHeight='17.6px'
                >
                  <Flex flexBasis='50%'>
                    <Text>Name</Text>
                    <Text ml='18%'>Comments/Notes</Text>
                  </Flex>
                  <Flex pl='16px' flexBasis='50%'>
                    <Text>Hours</Text>
                    <Text ml='48%'>Last updated date</Text>
                  </Flex>
                </Flex>
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
                              pt='14px'
                              pb='14px'
                              pl='25px'
                              display='flex'
                              justifyContent='space-between'
                              color='textLightMid'
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
                                  <Text textAlign='left'>Shritej B</Text>
                                </Box>
                              </Flex>
                              <Box pl='23%'>
                                <Text>2.5 Hrs</Text>
                              </Box>
                              <Box pr='15.4%'>
                                <Text>22 January 2022</Text>
                              </Box>
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                          </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
                    <AccordionItem>
                      {({ isExpanded }) => (
                        <>
                          <h2>
                            <AccordionButton
                              pt='14px'
                              pb='14px'
                              pl='25px'
                              display='flex'
                              justifyContent='space-between'
                              color='textLightMid'
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
                                  <Text textAlign='left'>Shritej B</Text>
                                </Box>
                              </Flex>
                              <Box pl='23%'>
                                <Text>2.5 Hrs</Text>
                              </Box>
                              <Box pr='15.4%'>
                                <Text>22 January 2022</Text>
                              </Box>
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                          </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
                  </Accordion>
                </Box>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default TaskDetailGranular;
