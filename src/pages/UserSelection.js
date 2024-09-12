// UserSelection.js
import { Box, Button, Heading, Text, Stack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const UserSelection = () => {
  const navigate = useNavigate()

  const handleSelectRole = (role) => {
    if (role === 'formateur') {
      navigate('/signup/formateur')
    } else if (role === 'etudiant') {
      navigate('/signup/etudiant')
    }
  }

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mb={6}>
        Inscription
      </Heading>
      <Text fontSize="lg" mb={6}>
        Choisissez votre rôle pour vous inscrire
      </Text>
      <Stack spacing={4} direction="column" align="center">
        <Button
          size="lg"
          colorScheme="teal"
          onClick={() => handleSelectRole('formateur')}
        >
          Je suis un Formateur
        </Button>
        <Button
          size="lg"
          colorScheme="blue"
          onClick={() => handleSelectRole('etudiant')}
        >
          Je suis un Etudiant
        </Button>
        <Button
          size="lg"
          colorScheme="gray"
          onClick={() => navigate('/login')}
        >
          J'ai déjà un compte (Connexion)
        </Button>
      </Stack>
    </Box>
  )
}

export default UserSelection
