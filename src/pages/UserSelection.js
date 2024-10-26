import { Box, Button, Heading, Text, VStack, Image } from '@chakra-ui/react';
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
      backgroundImage="url('/background-image.jpg')" // Remplacez par votre image de fond
      backgroundSize="cover" 
      backgroundPosition="center" 
      minH="100vh" 
      py={10} 
      px={6}
      display="flex" 
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-b, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/background-image.jpg')"
    >
      {/* Panneau central */}
      <Box
        bg="whiteAlpha.800"
        borderRadius="2xl"
        boxShadow="2xl"
        textAlign="center"
        p={12}
        maxW="md"
        w="full"
        backdropFilter="blur(10px)"
        color="gray.700"
      >
        {/* Logo centré */}
        <Image src="/logo1.png" alt="Logo" mb={4} boxSize="120px" mx="auto" />

        {/* Titre et sous-titre */}
        <Heading as="h2" size="lg" color="#383587" mb={1}>
          Bienvenue !
        </Heading>
        <Text fontSize="md" color="#d32c81" mb={8}>
          Choisissez votre rôle pour vous inscrire
        </Text>

        {/* Boutons de sélection du rôle dans un VBox pour un espacement vertical */}
        <VStack spacing={4}>
          <Button
            size="lg"
            bg="#ef8566" // Couleur du bouton pour formateur
            color="white"
            variant="solid"
            width="full"
            boxShadow="md"
            _hover={{ boxShadow: 'lg', transform: 'scale(1.05)', bg: '#d32c81' }}
            onClick={() => handleSelectRole('formateur')}
          >
            Je suis un Formateur
          </Button>
          <Button
            size="lg"
            bg="#383587" // Couleur du bouton pour étudiant
            color="white"
            variant="solid"
            width="full"
            boxShadow="md"
            _hover={{ boxShadow: 'lg', transform: 'scale(1.05)', bg: '#ef8566' }}
            onClick={() => handleSelectRole('etudiant')}
          >
            Je suis un Étudiant
          </Button>
        </VStack>

        {/* Lien vers la connexion */}
        <Text fontSize="sm" color="gray.500" mt={8}>
          Vous avez déjà un compte ?{" "}
          <Button
            variant="link"
            color="#383587" // Couleur du lien
            onClick={() => navigate('/login')}
          >
            Connexion
          </Button>
        </Text>
      </Box>
    </Box>
  );
};

export default UserSelection;
