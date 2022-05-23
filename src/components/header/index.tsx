import {
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { FaClock, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Box py='19px' bg='primary'>
      <Box className='wrapper'>
        <Flex w='full' justifyContent='space-between' alignItems='center'>
          <Link to='/'>
            <Heading display='flex' alignItems='center' color='white' fontSize='24px'>
              <FaClock  fontSize='20px'/>
              <Text as='span' ml='8px'>App</Text>
            </Heading>
          </Link>
          <Flex w='42%'p='0 15px' justifyContent='space-between' alignItems='center' bg='white' borderRadius='md'>
            <Box pr='8px' fontSize='22px'>
              <FaSearch />
            </Box>
            <Box w='full'>
              <Input placeholder='Search Projects' w='full' boxSizing='border-box' border='none' />
            </Box>
            <Box w='60px' textAlign='center'>
              <Text fontSize='12px'> Ctrl + K</Text>
            </Box>
          </Flex>
          <Box>
            <Menu>
              <MenuButton
                w='42px'
                h='42px '
                as={IconButton}
                outline='none'
                rounded='full'
                colorScheme='transparent'
              >
                <Avatar />
              </MenuButton>
              <MenuList>
                <MenuGroup>
                  <MenuItem>
                    <Text fontWeight='bold'>loggr</Text>
                  </MenuItem>
                  <MenuItem> Account </MenuItem>
                  <MenuItem> <Link to='dashboard' className='menu-anchor'>Dashboard</Link> </MenuItem>
                  <MenuItem> Setting </MenuItem>
                </MenuGroup>
                <MenuGroup>
                  <MenuItem>Log Out</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
