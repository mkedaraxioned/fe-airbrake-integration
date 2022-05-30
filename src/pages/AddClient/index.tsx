import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Divider,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import AddNewClientForm from '../../components/addNewClientForm';
import Calendar from '../../components/calender';
import ClientList from '../../components/clientList';
import TaskList from '../../components/taskList';
import TimeLogFrom from '../../components/timeLogForm';

const AddClient = () => {
  const showDetailsHandle = (dayStr: string) => {
    console.log(dayStr);
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
            <BreadcrumbItem mt='30px'>
              <Link to='/'>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Text color='textLight'>Docs</Text>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box p='16px 20px' mt='30px' bg='white' color='primary'>
            <Heading as='h2' fontSize='22px' lineHeight='33px'>
              Add New Client
            </Heading>
            <Divider borderColor='borderSecondary' />
            <AddNewClientForm />
          </Box>
          <Box w='full' mt='30px' color='primary'>
            <ClientList />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default AddClient;
