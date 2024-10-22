// UserSelection.js
import { Box, Button, Heading, Text, Stack, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const UserSelection = () => {
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    if (role === 'formateur') {
      navigate('/signup/formateur');
    } else if (role === 'etudiant') {
      navigate('/signup/etudiant');
    }
  };

  return (
    <Box 
      backgroundImage="url('/logo1.PNG')" // Remplacez par le nom de votre image
      backgroundSize="cover" 
      backgroundPosition="center" 
      minH="100vh" 
      py={10} 
      px={6}
      display="flex" 
      flexDirection="column" 
      justifyContent="space-between"
    >
      {/* Titre et texte centrés en haut */}
      <Box textAlign="center" mb={10}>
        <Heading as="h2" size="xl" color="teal.600">
          Inscription
        </Heading>
        <Text fontSize="lg" color="gray.700">
          Choisissez votre rôle pour vous inscrire
        </Text>
      </Box>

      {/* Flex pour aligner les boutons */}
<Flex justify="space-between" mb={7} mx={7}>
  <Button
    size="lg"
    colorScheme="teal"
    variant="solid"
    boxShadow="md"
    _hover={{ boxShadow: 'lg', transform: 'scale(1.05)' }}
    transition="all 0.2s"
    onClick={() => handleSelectRole('formateur')}
    alignSelf="center"
    width="200px" // Définir une largeur fixe
    mx={3} // Marge horizontale entre les boutons
  >
    Je suis un Formateur
  </Button>
  <Button
    size="lg"
    colorScheme="blue"
    variant="solid"
    boxShadow="md"
    _hover={{ boxShadow: 'lg', transform: 'scale(1.05)' }}
    transition="all 0.2s"
    onClick={() => handleSelectRole('etudiant')}
    alignSelf="center"
    width="200px" // Définir une largeur fixe
    mx={3} // Marge horizontale entre les boutons
  >
    Je suis un Etudiant
  </Button>
</Flex>


      {/* Bouton pour la connexion en bas */}
      <Box textAlign="center" mt={20}>
        <Button
          size="lg"
          colorScheme="gray"
          variant="outline"
          boxShadow="md"
          _hover={{ boxShadow: 'lg', transform: 'scale(1.05)' }}
          transition="all 0.2s"
          onClick={() => navigate('/login')}
        >
          J'ai déjà un compte (Connexion)
        </Button>
      </Box>
    </Box>
  );
};

export default UserSelection;
