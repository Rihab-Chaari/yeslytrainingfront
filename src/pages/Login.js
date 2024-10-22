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

      // Store token and user data in local storage
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify({
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        roles: response.data.roles,
      }));

      toast({
        title: 'Connexion réussie.',
        description: 'Bienvenue de nouveau !',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Perform redirection based on role
      const userRole = response.data.roles[0];
      if (userRole === 'ROLE_FORMATEUR') {
        navigate('/formateur-courses');
      } else if (userRole === 'ROLE_ETUDIANT') {
        navigate('/view-courses');
      } else {
        navigate('/stats'); // fallback
      }

    } catch (error) {
      toast({
        title: 'Échec de la connexion.',
        description: 'Identifiants invalides. Veuillez réessayer.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="10" p="6" boxShadow="lg" borderRadius="md" bg="white">
      <Heading mb="6" color="teal.300">Se connecter</Heading> {/* Couleur douce pour le titre */}
      <form onSubmit={handleSubmit}>
        <Stack spacing="6">
          <FormControl id="username" isRequired>
            <FormLabel>Nom d'utilisateur</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre nom d'utilisateur"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Mot de passe</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={isLoading}
            loadingText="Connexion..."
            bg="teal.400" 
            _hover={{ bg: 'teal.500' }} // Couleur douce pour le bouton
          >
            Se connecter
          </Button>
        </Stack>
      </form>
      <Text mt="4">
  Vous n'avez pas de compte ?
</Text>
<Stack spacing={2} mt={2}> {/* Espace entre les boutons */}
  <Button variant="link" onClick={() => navigate('/signup/formateur')}>
    S'inscrire Formateur
  </Button>
  <Button variant="link" onClick={() => navigate('/signup/etudiant')}>
    S'inscrire Etudiant
  </Button>
</Stack>
      
    </Box>
  );
};

export default Login;
