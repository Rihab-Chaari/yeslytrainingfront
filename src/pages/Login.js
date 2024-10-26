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
      <Heading mb="6" color="#383587">Se connecter</Heading> {/* Couleur pour le titre */}
      <form onSubmit={handleSubmit}>
        <Stack spacing="6">
          <FormControl id="username" isRequired>
            <FormLabel>Nom d'utilisateur</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre nom d'utilisateur"
              borderColor="#ef8566" // Couleur de la bordure
              _focus={{ borderColor: '#d32c81' }} // Couleur lors du focus
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Mot de passe</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              borderColor="#ef8566" // Couleur de la bordure
              _focus={{ borderColor: '#d32c81' }} // Couleur lors du focus
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={isLoading}
            loadingText="Connexion..."
            bg="#ef8566" // Couleur du bouton
            color="white"
            _hover={{ bg: '#d32c81' }} // Couleur lors du survol
          >
            Se connecter
          </Button>
        </Stack>
      </form>
      <Text mt="4" color="#383587">
        Vous n'avez pas de compte ?
      </Text>
      <Stack spacing={2} mt={2}> {/* Espace entre les boutons */}
        <Button variant="link" color="#383587" onClick={() => navigate('/signup/formateur')}>
          S'inscrire Formateur
        </Button>
        <Button variant="link" color="#383587" onClick={() => navigate('/signup/etudiant')}>
          S'inscrire Étudiant
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
