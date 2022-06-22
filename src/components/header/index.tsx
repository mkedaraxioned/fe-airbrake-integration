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
import { FaClock } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { userLogout } from '../../feature/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

const Header = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(userLogout());
    navigate('/login', { replace: true });
  };

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
              <Text as='span' ml='8px' textStyle='sourceSansProBold'>
                Loggr
              </Text>
            </Heading>
          </Link>
        </Box>
        <Flex
          w='71%'
          justifyContent='space-between'
          alignItems='center'
          color='grayLight'
        >
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
                textStyle='sourceSansProRegular'
                boxSizing='border-box'
                border='none'
                _focus={{ border: 'none' }}
              />
            </Box>
            <Box w='60px' textAlign='center'>
              <Text fontSize='12px' textStyle='sourceSansProBold'>
                {' '}
                Ctrl + K
              </Text>
            </Box>
          </Flex>
          <Flex alignItems='center'>
            {user.role === 'admin' ? (
              <UnorderedList
                display='flex'
                listStyleType='none'
                textStyle='sourceSansProBold'
                color='textColor'
              >
                <ListItem margin='0 15px' fontSize='18px' lineHeight='23px'>
                  <Link to='/clients'>Clients</Link>
                </ListItem>
                <ListItem margin='0 15px' fontSize='18px' lineHeight='23px'>
                  <Link to='/projects'>Projects</Link>
                </ListItem>
                <ListItem margin='0 15px' fontSize='18px' lineHeight='23px'>
                  <Link to='/team'>Team</Link>
                </ListItem>
              </UnorderedList>
            ) : null}
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
                <Avatar w='full' h='full' src='' />
              </MenuButton>
              <MenuList>
                <MenuGroup>
                  <MenuItem pointerEvents='none'>
                    <Text fontWeight='bold'>{user.name}</Text>
                  </MenuItem>
                  {user.role === 'admin' ? (
                    <>
                      <MenuItem> Account </MenuItem>
                      <MenuItem>
                        {' '}
                        <Link to='dashboard' className='menu-anchor'>
                          Dashboard
                        </Link>{' '}
                      </MenuItem>
                      <MenuItem> Setting </MenuItem>
                    </>
                  ) : null}
                </MenuGroup>
                <MenuGroup>
                  <MenuItem onClick={logOut}>Log Out</MenuItem>
                </MenuGroup>
                <MenuGroup>
                  <MenuItem>
                    <ColorModeSwitcher />
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
