import {
  Avatar,
  Box,
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
import { FaClock} from 'react-icons/fa';
import {AiOutlineSearch} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

const Header = () => {
  const menus = [
    {
      url: '/clients',
      title: 'Clients',
    },
    {
      url: '/projects',
      title: 'Projects',
    },
    {
      url: '/team',
      title: 'Team',
    },
  ];
  return (
    <Box py='18px' shadow='md'>
      <Flex
        className='wrapper'
        justifyContent='space-between'
        alignItems='center'
      >
        <Box>
          <Link to='/'>
            <Heading display='flex' alignItems='center' fontSize='24px'>
              <FaClock fontSize='20px' />
              <Text as='span' ml='8px'>
                App
              </Text>
            </Heading>
          </Link>
        </Box>
        <Flex w='71%' justifyContent='space-between' alignItems='center' color='grayLight'>
          <Flex
            w='522px'
            p='0 15px'
            justifyContent='space-between'
            alignItems='center'
            borderRadius='md'
            border='1px'
            borderColor='borderColor'
          >
            <Box pr='8px' fontSize='22px'>
              <AiOutlineSearch />
            </Box>
            <Box w='full'>
              <Input
                placeholder='Search Projects'
                w='full'
                boxSizing='border-box'
                border='none'
                _focus={{ border: 'none' }}
              />
            </Box>
            <Box w='60px' textAlign='center'>
              <Text fontSize='12px'> Ctrl + K</Text>
            </Box>
          </Flex>
          <Flex alignItems='center'>
            <UnorderedList
              display='flex'
              alignItems='center'
              listStyleType='none'
            >
              {menus.map((menu, index) => (
                <ListItem margin='0 15px' fontSize='18px'
                lineHeight='22.63px' key={index}>
                  <Link to={menu.url}>{menu.title}</Link>
                </ListItem>
              ))}
            </UnorderedList>
            <Menu>
              <MenuButton
                ml='30px'
                as={IconButton}
                outline='none'
                rounded='full'
                w='41px'
                h='41px'
                colorScheme='transparent'
                border='2px'
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
                <MenuGroup>
                  <MenuItem>
                    <ColorModeSwitcher/>
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
