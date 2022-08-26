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
  useToast,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../interfaces/team';
import { _get, _patch } from '../../utils/api';

const Team = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const switchHandler = async (user: User) => {
    try {
      if (user?.role === 'ADMIN') {
        setLoading(true);
        const res = await _patch(`api/users/${user?.id}`, { role: 'NORMAL' });
        if (res.status === 200) {
          setLoading(false);
          toast({
            title: 'Status',
            description: 'Admin Access Removed',
            status: 'error',
            duration: 2000,
            position: 'top-right',
            isClosable: true,
          });
        }
      } else if (user?.role === 'NORMAL') {
        setLoading(true);
        const res = await _patch(`api/users/${user?.id}`, { role: 'ADMIN' });
        if (res.status === 200) {
          setLoading(false);
          toast({
            title: 'Status',
            description: 'Admin Access Given',
            status: 'success',
            duration: 2000,
            position: 'top-right',
            isClosable: true,
          });
        }
      }
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchAllUser();
      countAdmins();
    }
  }, [loading]);

  const fetchAllUser = async () => {
    try {
      const res = await _get('api/users/all');
      setAllUsers(res.data.users);
    } catch (err) {
      return err;
    }
  };

  const countAdmins = () => {
    let admins = 0;
    if (allUsers.length > 0) {
      allUsers.forEach((user: User) => {
        if (user?.role === 'ADMIN') {
          admins = admins + 1;
        }
      });
      return admins;
    }
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
              {allUsers && allUsers.length} people
            </Text>{' '}
            on this account,
            <Text as='span' fontWeight='bold'>
              {' '}
              {countAdmins()}{' '}
            </Text>
            are admin.
          </Text>
          <Divider m='25px 0' />
          <TableContainer bg='white' rounded='md'>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th fontSize='14px' textTransform='capitalize'>
                    Name
                  </Th>
                  <Th fontSize='14px' textTransform='capitalize'>
                    Email Address
                  </Th>
                  <Th fontSize='14px' textTransform='capitalize'>
                    Admin
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {Array.isArray(allUsers) &&
                  allUsers.map((user: User) => (
                    <Tr key={user?.id}>
                      <Td>
                        <HStack alignItems='center'>
                          <Box w='24px' h='24px' mr='5px'>
                            <Avatar w='full' h='full' />
                          </Box>
                          <Text fontSize='14px' as='span'>
                            {user?.name}
                          </Text>
                        </HStack>
                      </Td>
                      <Td fontSize='14px'>{user?.email}</Td>
                      <Td>
                        <Switch
                          isChecked={user?.role === 'ADMIN' ? true : false}
                          onChange={() => switchHandler(user)}
                        />
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Team;
