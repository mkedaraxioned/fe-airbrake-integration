import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
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
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ERole } from '../../constants/enum';
import { User } from '../../interfaces/team';
import { RootState } from '../../redux';
import { _get, _patch } from '../../utils/api';

const Team = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const currentUser = useSelector((state: RootState) => state.rootSlices.user);

  const switchHandler = async (user: User) => {
    try {
      if (user?.role === ERole.ADMIN) {
        setLoading(true);
        const res = await _patch(`api/users/${user?.id}`, {
          role: ERole.NORMAL,
        });
        if (res.status === 200) {
          setLoading(false);
          toast({
            title: 'Status',
            description: `Admin access removed from ${user?.name}`,
            status: 'success',
            duration: 2000,
            position: 'top-right',
            isClosable: true,
          });
        }
      } else if (user?.role === ERole.NORMAL) {
        setLoading(true);
        const res = await _patch(`api/users/${user?.id}`, {
          role: ERole.ADMIN,
        });
        if (res.status === 200) {
          setLoading(false);
          toast({
            title: 'Status',
            description: `Admin access given to ${user?.name}`,
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
        if (user?.role === ERole.ADMIN) {
          admins = admins + 1;
        }
      });
      return admins;
    }
  };

  return (
    <Box className='wrapper'>
      <Box w='full' p='30px 0' color='primary'>
        <Breadcrumb fontSize='14px'>
          <BreadcrumbItem m='30px 0 18px'>
            <Link to='/'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Text color='textLight'>Teams</Text>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box>
          <Heading as='h2' fontSize='22px' lineHeight='33px' marginBottom='5px'>
            Your Team
          </Heading>
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
                            <Avatar w='full' h='full' src={user?.avatar} />
                          </Box>
                          <Text fontSize='14px' as='span'>
                            {user?.name}
                          </Text>
                        </HStack>
                      </Td>
                      <Td fontSize='14px'>{user?.email}</Td>
                      <Td>
                        <Switch
                          colorScheme='switchPurple'
                          isChecked={user?.role === ERole.ADMIN ? true : false}
                          onChange={() => switchHandler(user)}
                          isDisabled={
                            currentUser.profile.name === user.name
                              ? true
                              : false
                          }
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
