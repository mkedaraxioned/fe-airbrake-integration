import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../feature/userSlice';
import { useNavigate } from 'react-router';
import loginImg from '../../assets/images/loginImg.png';
import axionedLogo from '../../assets/images/axionedLogo.png';
import { AiFillClockCircle, AiFillHeart } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = () => {
    dispatch(userLogin({ name: 'Axioned loggr', role: 'admin' }));
    navigate('/', { replace: true });
  };
  return (
    <Box>
      <Flex>
        <Box w='50%'>
          <Image
            src={loginImg}
            h='100vh'
            w='full'
            alt='Axioned'
            objectFit='cover'
          />
        </Box>
        <Flex
          w='50%'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          position='relative'
        >
          <AiFillClockCircle fontSize='32px' />
          <Heading
            fontSize='40px'
            lineHeight='52.08px'
            textStyle='sourceSansProBold'
          >
            Loggr
          </Heading>
          <Text
            fontSize='24px'
            lineHeight='31.25px'
            textStyle='sourceSansProMedium'
          >
            That’s how we roll
          </Text>
          <Button
            as='a'
            leftIcon={<FcGoogle style={{ fontSize: '23px' }} />}
            w='261px'
            h='54px'
            mt='74px'
            shadow='0 4px 25px 1px rgb(0 0 0 / 8%)'
            cursor='pointer'
            href='#fixme'
            onClick={loginUser}
            bg='white'
            _hover={{
              shadow: 'none',
              bg: 'rgba(0,0,0,.05)',
            }}
          >
            <Text
              color='black'
              fontSize='20px'
              opacity='.5'
              textStyle='sourceSansProBold'
            >
              Continue with Google
            </Text>
          </Button>
          <VStack
            position='absolute'
            bottom='30px'
            left='50%'
            transform='translateX(-50%)'
          >
            <Image src={axionedLogo} alt='Axioned' />
            <Text pt='5px'>
              Made with{' '}
              <AiFillHeart
                style={{
                  display: 'inline',
                  color: 'red',
                  verticalAlign: 'text-top',
                }}
              />{' '}
              in India
            </Text>
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Login;
