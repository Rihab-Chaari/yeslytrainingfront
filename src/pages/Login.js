import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await axios.post('http://localhost:8081/api/auth/signin', {
        username,
        password,
      });
  
      // Log the response to check what role is being returned
      console.log(response.data);
  
      // Store token and role in local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.roles[0]); // Ensure roles[0] is correct based on response
  
      toast({
        title: 'Login successful.',
        description: 'Welcome back!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
  
      // Debug the role and perform redirection
      if (response.data.roles[0] === 'ROLE_FORMATEUR') {
        navigate('/dashboard/formateur');
      } else if (response.data.roles[0] === 'ROLE_ETUDIANT') {
        navigate('/dashboard/etudiant');
      } else {
        navigate('/dashboard'); // fallback
      }
  
    } catch (error) {
      toast({
        title: 'Login failed.',
        description: 'Invalid credentials. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="10" p="6" boxShadow="lg" borderRadius="md">
      <Heading mb="6">Sign In</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing="6">
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={isLoading}
            loadingText="Signing in"
          >
            Sign In
          </Button>
        </Stack>
      </form>
      <Text mt="4">
        Don't have an account?{' '}
        <Button variant="link" onClick={() => navigate('/signup')}>
          Sign Up
        </Button>
      </Text>
    </Box>
  );
};

export default Login;