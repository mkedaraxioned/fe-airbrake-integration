import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Divider,
  Flex,
  Heading,
  HStack,
  ListItem,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from '../../components/calender';
import CustomCheckbox from '../../components/customCheckBox';

const Team = () => {
  const [checked, setChecked] = useState(false);
  const showDetailsHandle = (dayStr: string) => {
    console.log(dayStr);
  };
  const switchHandler = (role: string) => {
    setChecked(true);
    let myVar = '';
    if (role === 'admin') {
      myVar = 'normal';
    } else {
      myVar = 'admin';
    }
    console.log(myVar)
  };

  return (
    <Box className='wrapper'>
      <Flex>
        <Box mr='50px'>
          <Calendar showDetailsHandle={showDetailsHandle} />
          <Box p='20px 30px'>
            <Heading as='h2' fontSize='22px' lineHeight='32px' color='primary'>
              Recently Used
            </Heading>
            <UnorderedList listStyleType='none' m='0' color='primary'>
              <ListItem fontSize='16px' lineHeight='24px' m='14px 0'>
                # Teenlife website maintenance (Sprint 2 - #ICJ..)
              </ListItem>
              <ListItem fontSize='16px' lineHeight='24px' m='14px 0'>
                # TEG - WordPress maintenance (Month 46)
              </ListItem>
              <ListItem fontSize='16px' lineHeight='24px' m='14px 0'>
                # Pandamic Action Network (Months 65)
              </ListItem>
              <ListItem fontSize='16px' lineHeight='24px' m='14px 0'>
                # Shutterstock (Months 65)
              </ListItem>
              <ListItem fontSize='16px' lineHeight='24px' m='14px 0'>
                # Teenlife website maintenance (Sprint 2 - #ICJ..)
              </ListItem>
              <ListItem fontSize='16px' lineHeight='24px' m='14px 0'>
                # TEG - WordPress maintenance (Month 46)
              </ListItem>
              <ListItem fontSize='16px' lineHeight='24px' m='14px 0'>
                # Pandamic Action Network (Months 65)
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>
        <Box w='849px' color='primary'>
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
                      {/* <Checkbox w='44px' h='22px' boxShadow='unset' position='relative' _before={{content:`""`,width:'18px',height:'18px', m:'1px', rounded:'full', position:'absolute', zIndex:'5', backgroundColor:'white'}}
                      _after={{content:`""`,width:'full',height:'full', rounded:'full', position:'absolute', zIndex:'4', bg:'#1890FF'}}
                      _checked={{_before:{right:'0',},_after:{bg:'#BFBFBF'}}}/> */}
                      <Switch onChange={() => switchHandler('normal')} />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Team;
