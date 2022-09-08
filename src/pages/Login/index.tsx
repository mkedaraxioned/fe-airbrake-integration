import React, { useEffect } from 'react';
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
import { userLogin } from '../../redux/reducers/userSlice';
import { useNavigate } from 'react-router';
import loginImg from '../../assets/images/loginImg.png';
import axionedLogo from '../../assets/images/axionedLogo.png';
import { AiFillClockCircle } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { variables } from '../../constants/backend';
import { useSearchParams } from 'react-router-dom';
import { _get } from '../../utils/api';
import preventRefresh from '../../utils/preventRefresh';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') as string;

  preventRefresh();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      getUserProfile();
      navigate('/', { replace: true });
    }
  }, []);

  const getUserProfile = async () => {
    const res = await _get('api/users/profile');
    dispatch(userLogin(res.data.profile));
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
            href={`${variables.BACKEND_URL}api/auth/google`}
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
              <Text as='span' color='red' fontSize='18px'>
                &#10084;
              </Text>{' '}
              in India
            </Text>
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Login;
