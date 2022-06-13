import { Box, Divider, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const ClientList = () => {
  return (
    <Box>
      <Heading as='h2' fontSize='22px' lineHeight='33px'>
        Client List
      </Heading>
      <Divider m='28px 0' borderColor='borderSecondary' />
      <VStack>
        <Flex
          w='full'
          p='18px 30px'
          m='5px 0'
          rounded='md'
          bg='white'
          alignItems='center'
          justifyContent='space-between'
        >
          <Flex alignItems='center'>
            <Text>Harvest</Text>
            <Box p='0 8px'>
              <AiOutlineEdit />
            </Box>
          </Flex>
          <Box>
            <AiOutlineDelete />
          </Box>
        </Flex>
        <Flex
          w='full'
          p='18px 30px'
          m='5px 0'
          rounded='md'
          bg='white'
          alignItems='center'
          justifyContent='space-between'
        >
          <Flex alignItems='center'>
            <Text>HSUSA</Text>
            <Box p='0 8px'>
              <AiOutlineEdit />
            </Box>
          </Flex>
          <Box>
            <AiOutlineDelete />
          </Box>
        </Flex>
        <Flex
          w='full'
          p='18px 30px'
          m='5px 0'
          rounded='md'
          bg='white'
          alignItems='center'
          justifyContent='space-between'
        >
          <Flex alignItems='center'>
            <Text>Shutterstock</Text>
            <Box p='0 8px'>
              <AiOutlineEdit />
            </Box>
          </Flex>
          <Box>
            <AiOutlineDelete />
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
};

export default ClientList;
