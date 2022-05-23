import { Box, Flex, Heading, HStack } from '@chakra-ui/react'
import React from 'react'
import Calendar from '../../components/calender'

const Dashboard = () => {
  const showDetailsHandle = (dayStr: string) => {
    console.log(dayStr)
  };
  return (
    <Box className='wrapper'>
      <Flex justifyContent='space-between'>
        <HStack>
          <Calendar showDetailsHandle={showDetailsHandle}/>
        </HStack>
        <HStack>
          <Heading>middle layout</Heading>
        </HStack>
        <HStack>
          <Heading>Right layout</Heading>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Dashboard