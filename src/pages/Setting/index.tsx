import React from 'react';
import { Container, Heading, Text, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';

const Setting = () => {
  const { profile } = useSelector((state: RootState) => state.rootSlices.user);

  return (
    <Container mt={4}>
      {profile && (
        <VStack>
          <Heading as='h2'>Name: {profile.name}</Heading>
          <Text fontSize='xl'>Email: {profile.email}</Text>
          <Text fontSize='xl'>Role: {profile.role}</Text>
        </VStack>
      )}
    </Container>
  );
};

export default Setting;
