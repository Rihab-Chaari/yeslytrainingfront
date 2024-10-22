import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, Heading, VStack, useColorModeValue } from '@chakra-ui/react';

const EtudiantsInscrits = ({ coursId }) => {
  const [etudiants, setEtudiants] = useState([]);

  useEffect(() => {
    const fetchEtudiants = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`http://localhost:8081/api/cours/${coursId}/students`, config); // Corrected API path
        setEtudiants(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    if (coursId) {
      fetchEtudiants();
    }
  }, [coursId]);

  // Define color mode values at the top level of the component
  const boxBgColor = useColorModeValue('gray.50', 'gray.700');
  
  return (
    <Box mt={4}>
      <Heading size="sm" mb={2}>Étudiants Inscrits</Heading>
      {etudiants.length > 0 ? (
        etudiants.map((etudiant) => (
          <Box
            key={etudiant.id}
            p={3}
            borderWidth="1px"
            borderRadius="lg"
            bg={boxBgColor} // Use the variable here
            mt={2}
            boxShadow="sm"
            transition="0.2s"
            _hover={{ boxShadow: 'md' }}
          >
            <VStack align="start" spacing={1}>
              <Text><strong>Nom:</strong> {etudiant.nom}</Text>
              <Text><strong>Prénom:</strong> {etudiant.prenom}</Text>
              <Text><strong>Email:</strong> {etudiant.email}</Text>
              <Text><strong>Spécialité:</strong> {etudiant.specialite}</Text>
              <Text><strong>Âge:</strong> {etudiant.age}</Text>
            </VStack>
          </Box>
        ))
      ) : (
        <Text textAlign="center" color="gray.500" mt={2}>Aucun étudiant inscrit pour ce cours.</Text>
      )}
    </Box>
  );
};

export default EtudiantsInscrits;
