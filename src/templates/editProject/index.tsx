import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  ListItem,
  StackDivider,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const EditProject = () => {
  return (
    <Box>
      <Box p='15px 55px 0' className='wrapper'>
        <Breadcrumb
          m='15px 0'
          fontSize='14px'
          textStyle='sourceSansProRegular'
          spacing='4px'
        >
          <BreadcrumbItem color='textLight'>
            <Text color='black'>
              <Link to='/'>Home</Link>
            </Text>
          </BreadcrumbItem>
          <BreadcrumbItem color='textLight'>
            <Link to='/projects'>Projects</Link>
          </BreadcrumbItem>
          <BreadcrumbItem color='textLight'>
            <Text>Harvest</Text>
          </BreadcrumbItem>
          <BreadcrumbItem color='textLight'>
            <Text>Manage</Text>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent='space-between'>
          <VStack align='center' justifyContent='center'>
            <Text
              fontSize='14px'
              color='textGray'
              textStyle='sourceSansProRegular'
              lineHeight='17.6px'
            >
              Harvest
            </Text>
            <Heading
              as='h2'
              m='0 !important'
              color='textColor'
              textStyle='sourceSansProBold'
              fontSize='22px'
              lineHeight='27.65px'
            >
              123V
            </Heading>
          </VStack>
          <HStack>
            <Button w='137px' mr='10px' variant='secondary'>
              Edit Project
            </Button>
            <Button w='137px' ml='10px' variant='primary'>
              Manage
            </Button>
          </HStack>
        </Flex>
        <Box p='30px 0 0'>
          <Box pos='relative'>
            <Text
              pr='10px'
              pos='absolute'
              top='-12px'
              left='0'
              bg='white'
              zIndex='3'
              color='textColor'
              textStyle='sourceSansProBold'
              fontSize='18px'
              lineHeight='22.63px'
            >
              Manage
            </Text>
            <Divider />
          </Box>
          <HStack
            justifyContent='space-between'
            alignItems='flex-start'
            divider={<StackDivider />}
          >
            <Box h='77vh' p='22px 0'>
              <Flex
                justifyContent='space-between'
                color='textLightMid'
                textStyle='sourceSansProBold'
                fontSize='14px'
                lineHeight='17.6px'
              >
                <Text>Month cycle - Milestone</Text>
                <Text>Total budget hrs (opt)</Text>
              </Flex>
              <UnorderedList m='0'>
                <ListItem m='20px 0' display='flex'>
                  <Box
                    w='387px'
                    p='12px 17px'
                    mr='32px'
                    rounded='md'
                    bg='grayMid'
                  >
                    <Text textStyle='inputTextStyle'>
                      Month 1 (May 18 - Jun 17
                    </Text>
                  </Box>
                  <FormControl w='114px'>
                    <Input
                      type='text'
                      textStyle='inputTextStyle'
                      value={80}
                      textAlign='center'
                    />
                  </FormControl>
                </ListItem>
                <ListItem m='20px 0' display='flex'>
                  <Box
                    w='387px'
                    p='12px 17px'
                    mr='32px'
                    rounded='md'
                    bg='grayMid'
                  >
                    <Text textStyle='inputTextStyle'>
                      Month 1 (May 18 - Jun 17
                    </Text>
                  </Box>
                  <FormControl w='114px'>
                    <Input
                      type='text'
                      textStyle='inputTextStyle'
                      _disabled={{ bg: 'grayMid' }}
                      disabled
                      value={80}
                      textAlign='center'
                    />
                  </FormControl>
                </ListItem>
                <ListItem m='20px 0' display='flex'>
                  <Box
                    w='387px'
                    p='12px 17px'
                    mr='32px'
                    rounded='md'
                    bg='grayMid'
                  >
                    <Text textStyle='inputTextStyle'>
                      Month 1 (May 18 - Jun 17
                    </Text>
                  </Box>
                  <FormControl w='114px'>
                    <Input
                      type='text'
                      textStyle='inputTextStyle'
                      _disabled={{ bg: 'grayMid' }}
                      disabled
                      value={80}
                      textAlign='center'
                    />
                  </FormControl>
                </ListItem>
              </UnorderedList>
              <Text textStyle='inputTextStyle' textDecor='underline'>
                Load older entries
              </Text>
            </Box>
            <Box p='22px 0'>
              <Flex w='562px' justifyContent='space-between'>
                <HStack
                  flexBasis='69%'
                  justifyContent='space-between'
                  color='textLightMid'
                  textStyle='sourceSansProBold'
                  fontSize='14px'
                  lineHeight='17.6px'
                >
                  <Text>Task/Activity name</Text>
                  <Text fontWeight='400' textDecor='underline'>
                    View archive tasks
                  </Text>
                </HStack>
                <HStack
                  flexBasis='26%'
                  justifyContent='space-between'
                  color='textLightMid'
                  textStyle='sourceSansProBold'
                  fontSize='14px'
                  lineHeight='17.6px'
                >
                  <Text>Budget Hrs</Text>
                  <Text m='0 !important'>Archive</Text>
                </HStack>
              </Flex>
              <UnorderedList listStyleType='none' m='0'>
                <ListItem m='20px 0'>
                  <HStack>
                    <FormControl w='387px' mr='20px'>
                      <Input
                        type='text'
                        textStyle='inputTextStyle'
                        value='Task name 1'
                      />
                    </FormControl>
                    <FormControl w='60px' mr='37px !important'>
                      <Input
                        type='text'
                        textStyle='inputTextStyle'
                        value={20}
                        textAlign='center'
                      />
                    </FormControl>
                    <Box>
                      <Checkbox size='lg' />
                    </Box>
                  </HStack>
                </ListItem>
                <ListItem m='20px 0'>
                  <HStack>
                    <FormControl w='387px' mr='20px'>
                      <Input
                        type='text'
                        textStyle='inputTextStyle'
                        value='Task name 1'
                      />
                    </FormControl>
                    <FormControl w='60px' mr='37px !important'>
                      <Input
                        type='text'
                        textStyle='inputTextStyle'
                        value={20}
                        textAlign='center'
                      />
                    </FormControl>
                    <Box>
                      <Checkbox size='lg' />
                    </Box>
                  </HStack>
                </ListItem>
                <ListItem m='20px 0'>
                  <HStack>
                    <FormControl w='387px' mr='20px'>
                      <Input
                        type='text'
                        textStyle='inputTextStyle'
                        value='Task name 1'
                      />
                    </FormControl>
                    <FormControl w='60px' mr='37px !important'>
                      <Input
                        type='text'
                        textStyle='inputTextStyle'
                        value={20}
                        textAlign='center'
                      />
                    </FormControl>
                    <Box>
                      <Checkbox size='lg' />
                    </Box>
                  </HStack>
                </ListItem>
              </UnorderedList>
              <Box
                display='flex'
                alignItems='center'
                textStyle='inputTextStyle'
                cursor='pointer'
              >
                <AiOutlinePlusCircle />
                <Text ml='5px' textStyle='inputTextStyle'>
                  Add new task
                </Text>
              </Box>
            </Box>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProject;
