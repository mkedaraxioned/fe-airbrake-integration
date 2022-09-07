import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
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
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { FaClock } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { userLogout } from '../../redux/reducers/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux';
import NewClient from '../addClient';
import { ERole } from '../../constants/enum';

const Header = () => {
  const user = useSelector((state: RootState) => state.rootSlices.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const ModalBox = () => {
    return (
      <Drawer isOpen={isOpen} size='lg' placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent overflowY='scroll' w='588px !important'>
          <DrawerCloseButton zIndex='10' mt='10px' mr='10px' />
          <DrawerBody>
            <NewClient onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  };

  const logOut = () => {
    dispatch(userLogout());
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <Box py='18px' bg='white' position='sticky' top='0' shadow='md' zIndex='5'>
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
            <Box
              w='60px'
              textAlign='center'
              bg='white'
              border='2px'
              borderColor='borderColor'
              rounded='md'
            >
              <Text fontSize='12px' textStyle='sourceSansProBold'>
                {' '}
                Ctrl + K
              </Text>
            </Box>
          </Flex>
          <Flex alignItems='center'>
            {user.profile.role === ERole.ADMIN ? (
              <UnorderedList
                display='flex'
                listStyleType='none'
                textStyle='sourceSansProBold'
                color='textColor'
              >
                <ListItem margin='0 15px' fontSize='18px' lineHeight='23px'>
                  <Text onClick={onOpen} cursor='pointer'>
                    Clients
                  </Text>
                </ListItem>
                {(user.profile.role === ERole.ADMIN ||
                  user.profile.role === ERole.NORMAL) && (
                  <ListItem margin='0 15px' fontSize='18px' lineHeight='23px'>
                    <Link to='/projects'>Projects</Link>
                  </ListItem>
                )}
                <ListItem margin='0 15px' fontSize='18px' lineHeight='23px'>
                  <Link to='/team'>Team</Link>
                </ListItem>
                <ListItem margin='0 15px' fontSize='18px' lineHeight='23px'>
                  <Link to='/reports'>Reports</Link>
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
                <Avatar w='full' h='full' src={user.profile.avatar} />
              </MenuButton>
              <MenuList>
                <MenuGroup>
                  <MenuItem pointerEvents='none'>
                    <Text fontWeight='bold'>{user.profile.name}</Text>
                  </MenuItem>
                  {user.profile.role === ERole.ADMIN ? (
                    <>
                      <MenuItem> Account </MenuItem>
                      <MenuItem>
                        <Link to='/dashboard' className='menu-anchor'>
                          Dashboard
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to='/setting' className='menu-anchor'>
                          Settings
                        </Link>
                      </MenuItem>
                    </>
                  ) : null}
                </MenuGroup>
                <MenuGroup>
                  <MenuItem onClick={logOut}>Sign Out</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>
      <ModalBox />
    </Box>
  );
};

export default Header;
