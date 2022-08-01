import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Divider,
  Heading,
  HStack,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Team = () => {
  const [checked, setChecked] = useState(false);
  const switchHandler = (role: string) => {
    setChecked(true);
    let myVar = '';
    if (role === 'admin') {
      myVar = 'normal';
    } else {
      myVar = 'admin';
    }
    console.log(myVar);
  };

  return (
    <Box className='wrapper'>
      <Box w='full' p='30px' color='primary'>
        <Breadcrumb fontSize='14px'>
          <BreadcrumbItem m='30px 0 18px'>
            <Link to='/'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Text color='textLight'>Add Teams</Text>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box>
          <Heading as='h2' fontSize='22px' lineHeight='33px'>
            Your Team
          </Heading>
          <Text p='2px 0'>
            There are{' '}
            <Text as='span' fontWeight='bold'>
              8 people
            </Text>
            on this account,
            <Text as='span' fontWeight='bold'>
              {' '}
              7{' '}
            </Text>
            are admin.
          </Text>
          <Divider m='25px 0' />
          <TableContainer bg='white' rounded='md'>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>NAME</Th>
                  <Th>EMAIL ADDRESS</Th>
                  <Th>ADMIN</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <HStack alignItems='center'>
                      <Box w='24px' h='24px' mr='5px'>
                        <Avatar w='full' h='full' />
                      </Box>
                      <Text as='span'>Vipin</Text>
                    </HStack>
                  </Td>
                  <Td>vipiny@axioned.com</Td>
                  <Td>
                    <Switch />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <HStack alignItems='center'>
                      <Box w='24px' h='24px' mr='5px'>
                        <Avatar w='full' h='full' />
                      </Box>
                      <Text as='span'>Vipin</Text>
                    </HStack>
                  </Td>
                  <Td>vipiny@axioned.com</Td>
                  <Td>
                    <Switch
                      isChecked={checked ? true : false}
                      onChange={() => switchHandler('admin')}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <HStack alignItems='center'>
                      <Box w='24px' h='24px' mr='5px'>
                        <Avatar w='full' h='full' />
                      </Box>
                      <Text as='span'>Vipin</Text>
                    </HStack>
                  </Td>
                  <Td>vipiny@axioned.com</Td>
                  <Td>
                    <Switch />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <HStack alignItems='center'>
                      <Box w='24px' h='24px' mr='5px'>
                        <Avatar w='full' h='full' />
                      </Box>
                      <Text as='span'>Vipin</Text>
                    </HStack>
                  </Td>
                  <Td>vipiny@axioned.com</Td>
                  <Td>
                    <Switch />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <HStack alignItems='center'>
                      <Box w='24px' h='24px' mr='5px'>
                        <Avatar w='full' h='full' />
                      </Box>
                      <Text as='span'>Vipin</Text>
                    </HStack>
                  </Td>
                  <Td>vipiny@axioned.com</Td>
                  <Td>
                    <Switch onChange={() => switchHandler('normal')} />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Team;
