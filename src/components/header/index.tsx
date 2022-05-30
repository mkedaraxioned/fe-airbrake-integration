import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  ListItem,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { FaClock, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Box py='19px' bg='primary'>
      <Box className='wrapper'>
        <Flex w='full' justifyContent='space-between' alignItems='center'>
          <Flex alignItems='center'>
            <Link to='/'>
              <Heading
                display='flex'
                alignItems='center'
                color='white'
                fontSize='24px'
              >
                <FaClock fontSize='20px' />
                <Text as='span' ml='8px'>
                  App
                </Text>
              </Heading>
            </Link>
            <UnorderedList
              display='flex'
              color='white'
              listStyleType='none'
              fontSize='18px'
              lineHeight='27px'
            >
              <ListItem margin='0 23px'>
                <Link to='/projects'>Projects</Link>
              </ListItem>
              <ListItem margin='0 23px'>
                <Link to='/clients'>Clients</Link>
              </ListItem>
              <ListItem margin='0 23px'>
                <Link to='/team'>Team</Link>
              </ListItem>
            </UnorderedList>
          </Flex>
          {/* <Flex w='42%'p='0 15px' justifyContent='space-between' alignItems='center' bg='white' borderRadius='md'>
            <Box pr='8px' fontSize='22px'>
              <FaSearch />
            </Box>
            <Box w='full'>
              <Input placeholder='Search Projects' w='full' boxSizing='border-box' border='none' _focus={{border:'none'}} />
            </Box>
            <Box w='60px' textAlign='center'>
              <Text fontSize='12px'> Ctrl + K</Text>
            </Box>
          </Flex> */}
          <Flex alignItems='center'>
            <Box>
              <Button variant='primary'>
                <Link to='/add-project'>Add Project</Link>
              </Button>
            </Box>
            <Box margin='0 20px'>
              <Button variant='secondary'>
                <Link to='/add-client'>Add Client</Link>
              </Button>
            </Box>
            <Menu>
              <MenuButton
                as={IconButton}
                outline='none'
                rounded='full'
                w='41px'
                h='41px'
                colorScheme='transparent'
                border='2px'
                borderColor='white'
              >
                <Avatar w='full' h='full' />
              </MenuButton>
              <MenuList>
                <MenuGroup>
                  <MenuItem>
                    <Text fontWeight='bold'>loggr</Text>
                  </MenuItem>
                  <MenuItem> Account </MenuItem>
                  <MenuItem>
                    {' '}
                    <Link to='dashboard' className='menu-anchor'>
                      Dashboard
                    </Link>{' '}
                  </MenuItem>
                  <MenuItem> Setting </MenuItem>
                </MenuGroup>
                <MenuGroup>
                  <MenuItem>Log Out</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
