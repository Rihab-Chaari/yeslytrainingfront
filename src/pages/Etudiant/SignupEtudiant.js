import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupFormateur = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    nom: '',
    prenom: '',
    telephone: '',
    age: '',
    specialite: '',
    role: ['etudiant'] 
  })
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post('http://localhost:8081/api/auth/signup', formData);
      toast({
        title: 'Sign Up successful.',
        description: 'You can now log in!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Sign Up failed.',
        description: 'An error occurred. Please try again.',
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
      <Heading mb="6">Sign Up</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing="6">
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input name="username" type="text" value={formData.username} onChange={handleChange} />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" value={formData.email} onChange={handleChange} />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" value={formData.password} onChange={handleChange} />
          </FormControl>

          <FormControl id="nom" isRequired>
            <FormLabel>Nom</FormLabel>
            <Input name="nom" type="text" value={formData.nom} onChange={handleChange} />
          </FormControl>

          <FormControl id="prenom" isRequired>
            <FormLabel>Prénom</FormLabel>
            <Input name="prenom" type="text" value={formData.prenom} onChange={handleChange} />
          </FormControl>

          <FormControl id="telephone" isRequired>
            <FormLabel>Téléphone</FormLabel>
            <Input name="telephone" type="text" value={formData.telephone} onChange={handleChange} />
          </FormControl>

          <FormControl id="age" isRequired>
            <FormLabel>Age</FormLabel>
            <Input name="age" type="number" value={formData.age} onChange={handleChange} />
          </FormControl>

          <FormControl id="specialite" isRequired>
            <FormLabel>Spécialité</FormLabel>
            <Input name="specialite" type="text" value={formData.specialite} onChange={handleChange} />
          </FormControl>

          <Button type="submit" colorScheme="teal" isLoading={isLoading}>
            Sign Up
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SignupFormateur;
