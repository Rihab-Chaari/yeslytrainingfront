import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Heading, Text, Stack, VStack, Divider, useToast } from '@chakra-ui/react';
import SidebarWithHeader from '../../components/SidebarWithHeader';

const formatDate = (dateStr) => {
  if (!dateStr) return 'Date non disponible';

  const [day, month, year] = dateStr.split('/');
  const formattedDateStr = `${year}-${month}-${day}`;
  const date = new Date(formattedDateStr);

  if (isNaN(date.getTime())) return 'Date non disponible';

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const RecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]); // State for registered courses
  const toast = useToast();

  const handleRecommendation = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      console.error("ID d'étudiant non trouvé dans le local storage.");
      return; 
    }

    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/recommend/${user.id}`);
      setRecommendations(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast({
        title: 'Failed to load recommendations.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleInscription = async (courseId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      alert('User ID is missing!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const inscriptionData = {
        etudiantId: user.id,
        coursId: courseId,
      };

      const response = await axios.post('http://localhost:8081/api/inscriptions/inscri', inscriptionData, config);
      alert(response.data); // Show backend message

      // Update the registered courses state
      setRegisteredCourses((prev) => [...prev, courseId]);
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      const errorMessage = error.response && typeof error.response.data === 'string'
        ? error.response.data
        : 'Erreur lors de l\'inscription.';
      alert(errorMessage);
    }
  };

  return (
    <SidebarWithHeader>
      <VStack spacing={6} align="stretch" p={4}>
        <Button colorScheme="teal" onClick={handleRecommendation} alignSelf="center">
          Obtenir des recommandations
        </Button>

        {recommendations.length > 0 ? (
          <Box>
            <Heading as="h3" size="lg" mb={4} textAlign="center">
              Recommandations de cours
            </Heading>
            <Stack spacing={6}>
              {recommendations.map((cours) => {
                const dateDebut = formatDate(cours.dateDebut);
                const dateFin = formatDate(cours.dateFin);
                const montant = cours.montant ? `${cours.montant} DT` : "Non spécifié";
                const isRegistered = registeredCourses.includes(cours.id); // Check if the user is registered

                return (
                  <Box 
                    key={cours.id} 
                    p={5} 
                    shadow="md" 
                    borderWidth="1px" 
                    borderRadius="lg"
                    bg="gray.100"
                    boxShadow="lg"
                    _hover={{ transform: 'scale(1.02)' }}
                    transition="transform 0.2s ease-in-out"
                  >
                    <VStack align="start" spacing={4}>
                      <Heading fontSize="xl" color="teal.600" fontWeight="bold">
                        {cours.titre}
                      </Heading>
                      <Text fontWeight="bold">Description: <Text as="span" color="gray.600">{cours.description}</Text></Text>
                      <Text fontWeight="bold">Date de début: <Text as="span" color="gray.600">{dateDebut}</Text></Text>
                      <Text fontWeight="bold">Date de fin: <Text as="span" color="gray.600">{dateFin}</Text></Text>
                      <Text fontWeight="bold">Durée: <Text as="span" color="gray.600">{cours.duree} heures</Text></Text>
                      <Text fontWeight="bold">Montant: <Text as="span" color="gray.600">{montant}</Text></Text>

                      {isRegistered ? (
                        <Button colorScheme="gray" isDisabled>
                          Inscrit
                        </Button>
                      ) : (
                        <Button colorScheme="teal" onClick={() => handleInscription(cours.id)}>
                          S'inscrire
                        </Button>
                      )}
                    </VStack>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        ) : (
          <Text textAlign="center">Aucune recommandation disponible.</Text>
        )}
      </VStack>
    </SidebarWithHeader>
  );
};

export default RecommendationsPage;
