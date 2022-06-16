import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../feature/userSlice';
import { useNavigate } from 'react-router';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = () => {
    dispatch(userLogin({ name: 'Axioned loggr', role: 'admin' }));
    navigate('/', { replace: true });
  };
  return (
    <Box p='40px' textAlign='center'>
      <Button variant='primary' onClick={loginUser}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
