import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, Heading, VStack, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import EtudiantsInscrits from './EtudiantsInscrits'; // Ensure this path is correct
import SidebarWithHeader from '../../components/SidebarWithHeader';

const CoursFormateur = () => {
  const [cours, setCours] = useState([]);
  const formateurId = JSON.parse(localStorage.getItem('user')).id; // Dynamic ID retrieval

  useEffect(() => {
    const fetchCours = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`http://localhost:8081/api/cours/formateur/${formateurId}`, config);
        setCours(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCours();
  }, [formateurId]);

  // Call useColorModeValue outside of map to avoid violating React Hooks rules
  const cardBgColor = useColorModeValue('white', 'gray.800');

  return (
    <SidebarWithHeader>
      <Box p={5}>
        <Heading size="lg" mb={4} textAlign="center">Liste des Cours</Heading>
        {cours.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {cours.map((cour) => (
              <Box
                key={cour.id}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                bg={cardBgColor} // Use the variable here
                boxShadow="md"
                transition="0.2s"
                _hover={{ boxShadow: 'lg' }}
              >
                <VStack align="start" spacing={2}>
                  <Heading size="md">{cour.titre}</Heading>
                  <Text fontSize="sm" color="gray.600">{cour.description}</Text>
                  <Text><strong>Durée:</strong> {cour.duree} heures</Text>
                  <Text><strong>Date de début:</strong> {cour.dateDebut}</Text>
                  <Text><strong>Date de fin:</strong> {cour.dateFin}</Text>
                </VStack>
                <EtudiantsInscrits coursId={cour.id} />
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Text textAlign="center" color="gray.500" mt={5}>Aucun cours trouvé pour ce formateur.</Text>
        )}
      </Box>
    </SidebarWithHeader>
  );
};

export default CoursFormateur;
