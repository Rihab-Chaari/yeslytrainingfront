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
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupEtudiant = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    nom: '',
    prenom: '',
    telephone: '',
    age: '',
    specialite: '',
    role: ['etudiant'], 
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
    <Box maxW="md" mx="auto" mt="10" p="6" boxShadow="lg" borderRadius="md" bg="white">
      <Heading mb="6" color="teal.300">Inscription Étudiant</Heading> {/* Couleur douce pour le titre */}
      <form onSubmit={handleSubmit}>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
          {['username', 'email', 'password', 'nom', 'prenom', 'telephone', 'age', 'specialite'].map((field, index) => (
            <GridItem key={index}>
              <FormControl id={field} isRequired>
                <FormLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
                <Input
                  name={field}
                  type={field === 'password' ? 'password' : field === 'age' ? 'number' : 'text'}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </FormControl>
            </GridItem>
          ))}
        </Grid>

        <Button 
          type="submit" 
          colorScheme="teal" 
          isLoading={isLoading} 
          mt={6} 
          bg="teal.400" 
          _hover={{ bg: 'teal.500' }} // Couleur douce pour le bouton
        >
          S'inscrire
        </Button>
      </form>
    </Box>
  );
};

export default SignupEtudiant;
