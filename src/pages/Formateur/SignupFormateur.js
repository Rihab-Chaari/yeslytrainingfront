import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast,
  Grid,
  GridItem,
  Text,
  VStack,
  Divider,
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
    role: ['formateur'], 
  });
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
        title: 'Inscription réussie.',
        description: 'Vous pouvez maintenant vous connecter !',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Échec de l’inscription.',
        description: 'Une erreur est survenue. Veuillez réessayer.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box 
      maxW="lg" 
      mx="auto" 
      mt={12} 
      p={8} 
      boxShadow="2xl" 
      borderRadius="xl" 
      bg="white" 
      border="1px solid" 
      borderColor="#383587" 
      _hover={{ boxShadow: "lg" }}
      backdropFilter="blur(8px)"
    >
      <VStack spacing={6} align="start">
        <Heading fontSize="2xl" color="#383587" textAlign="center" w="full">
          Inscription Formateur
        </Heading>
        <Text color="#d32c81" fontSize="sm">
          Veuillez remplir le formulaire ci-dessous pour créer votre compte formateur.
        </Text>
      </VStack>

      <Divider my={4} borderColor="#ef8566" />

      <form onSubmit={handleSubmit}>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6} mb={4}>
          {['username', 'email', 'password', 'nom', 'prenom', 'telephone', 'age', 'specialite'].map((field, index) => (
            <GridItem key={index}>
              <FormControl id={field} isRequired>
                <FormLabel fontSize="sm" fontWeight="bold" color="#383587">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </FormLabel>
                <Input
                  name={field}
                  type={field === 'password' ? 'password' : field === 'age' ? 'number' : 'text'}
                  value={formData[field]}
                  onChange={handleChange}
                  variant="filled"
                  bg="#f9f9fc" // Fond clair pour un bon contraste
                  _hover={{ bg: "#ef8566" }}
                  _focus={{ borderColor: '#d32c81', bg: 'white' }}
                />
              </FormControl>
            </GridItem>
          ))}
        </Grid>

        <Button 
          type="submit" 
          isLoading={isLoading} 
          w="full" 
          mt={4} 
          size="lg" 
          bg="#d32c81" 
          color="white"
          _hover={{ bg: '#ef8566', transform: 'scale(1.05)' }}
          _active={{ bg: '#383587' }}
          transition="all 0.2s"
        >
          S'inscrire
        </Button>
      </form>
    </Box>
  );
};

export default SignupFormateur;
