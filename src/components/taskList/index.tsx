import {
  Box,
  Heading,
  HStack,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import {AiOutlineEdit,AiOutlineDelete} from 'react-icons/ai'

const TaskList = () => {
  return (
    <Box p='17px 20px' color='primary' bg='white'>
      <Box>
        <HStack justifyContent='space-between'>
          <Heading as='h4' fontSize='22px' lineHeight='33px'>
            Task list
          </Heading>
          <Heading as='h4' fontSize='22px' lineHeight='33px'>
            Total: 7:30 Hrs
          </Heading>
        </HStack>
        <HStack
          justifyContent='flex-end'
          fontSize='14px'
          lineHeight='21px'
          opacity='0.5'
        >
          <Text>Billable : 5 Hrs</Text>
          <Text>Non-Billable : 2.5 Hrs</Text>
        </HStack>
      </Box>
      <Box>
        <HStack>
          <Heading
            w='full'
            as='h4'
            position='relative'
            _after={{
              content: `''`,
              width: '100%',
              height: '.7px',
              position: 'absolute',
              top: '28px',
              left: '0',
              bg: 'primary',
              opacity: '0.6',
              zIndex: '-1',
            }}
          >
            <Text
              as='span'
              pr='10px'
              bg='white'
              fontSize='18px'
              lineHeight='27px'
            >
              Project 1 (5 Hrs)
            </Text>
          </Heading>
        </HStack>
        <UnorderedList listStyleType='none' m='0'>
          <ListItem p='30px 20px' m='8px 0' border='1px' borderColor='borderPrimary' rounded='sm' display='flex' alignItems='center' justifyContent='space-between'>
            <Box textAlign='center'>
              <Text fontSize='24px' lineHeight='36px'>1:00</Text>
              <Text fontSize='10px' lineHeight='15px'>Billable</Text>
            </Box>
            <Box w='68%'>
              <Heading fontSize='16px' lineHeight='24px'>Lorem Ipsum is simply dummy text </Heading>
              <Text fontSize='12px' lineHeight='18px'>
                as opposed to using Content here,
              </Text>
              <Text fontSize='12px' lineHeight='18px' textDecoration='underline'>
                <Link to='/'>View more</Link>
              </Text>
            </Box>
            <HStack>
              <AiOutlineEdit/>
              <AiOutlineDelete/>
            </HStack>
          </ListItem>
          <ListItem p='30px 20px' m='8px 0' border='1px' borderColor='borderPrimary' rounded='sm' display='flex' alignItems='center' justifyContent='space-between'>
            <Box textAlign='center'>
              <Text fontSize='24px' lineHeight='36px'>1:00</Text>
              <Text fontSize='10px' lineHeight='15px'>Billable</Text>
            </Box>
            <Box w='68%'>
              <Heading fontSize='16px' lineHeight='24px'>Lorem Ipsum is simply dummy text </Heading>
              <Text fontSize='12px' lineHeight='18px'>
                as opposed to using Content here,
              </Text>
              <Text fontSize='12px' lineHeight='18px' textDecoration='underline'>
                <Link to='/'>View more</Link>
              </Text>
            </Box>
            <HStack>
              <AiOutlineEdit/>
              <AiOutlineDelete/>
            </HStack>
          </ListItem>
          <ListItem p='30px 20px' m='8px 0' border='1px' borderColor='borderPrimary' rounded='sm' display='flex' alignItems='center' justifyContent='space-between'>
            <Box textAlign='center'>
              <Text fontSize='24px' lineHeight='36px'>1:00</Text>
              <Text fontSize='10px' lineHeight='15px'>Billable</Text>
            </Box>
            <Box w='68%'>
              <Heading fontSize='16px' lineHeight='24px'>Lorem Ipsum is simply dummy text </Heading>
              <Text fontSize='12px' lineHeight='18px'>
                as opposed to using Content here,
              </Text>
              <Text fontSize='12px' lineHeight='18px' textDecoration='underline'>
                <Link to='/'>View more</Link>
              </Text>
            </Box>
            <HStack>
              <AiOutlineEdit/>
              <AiOutlineDelete/>
            </HStack>
          </ListItem>
        </UnorderedList>
        <HStack>
          <Heading
            w='full'
            as='h4'
            position='relative'
            _after={{
              content: `''`,
              width: '100%',
              height: '.7px',
              position: 'absolute',
              top: '28px',
              left: '0',
              bg: 'primary',
              opacity: '0.6',
              zIndex: '-1',
            }}
          >
            <Text
              as='span'
              pr='10px'
              bg='white'
              fontSize='18px'
              lineHeight='27px'
            >
              Project 1 (5 Hrs)
            </Text>
          </Heading>
        </HStack>
        <UnorderedList listStyleType='none' m='0'>
          <ListItem p='30px 20px' m='8px 0' border='1px' borderColor='borderPrimary' rounded='sm' display='flex' alignItems='center' justifyContent='space-between'>
            <Box textAlign='center'>
              <Text fontSize='24px' lineHeight='36px'>1:00</Text>
              <Text fontSize='10px' lineHeight='15px'>Billable</Text>
            </Box>
            <Box w='68%'>
              <Heading fontSize='16px' lineHeight='24px'>Lorem Ipsum is simply dummy text </Heading>
              <Text fontSize='12px' lineHeight='18px'>
                as opposed to using Content here,
              </Text>
              <Text fontSize='12px' lineHeight='18px' textDecoration='underline'>
                <Link to='/'>View more</Link>
              </Text>
            </Box>
            <HStack>
              <AiOutlineEdit/>
              <AiOutlineDelete/>
            </HStack>
          </ListItem>
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default TaskList;
