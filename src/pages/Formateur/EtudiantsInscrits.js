import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, Heading } from '@chakra-ui/react';

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
        const response = await axios.get(`http://localhost:8081/api/cours/${coursId}/etudiants`, config);
        setEtudiants(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des étudiants :', error);
      }
    };

    if (coursId) {
      fetchEtudiants();
    }
  }, [coursId]);

  return (
    <Box mt={4}>
      <Heading size="sm">Étudiants inscrits</Heading>
      {etudiants.length > 0 ? (
        etudiants.map((etudiant) => (
          <Box key={etudiant.id} p={2} borderWidth="1px" borderRadius="lg" w="100%" bg="gray.50" mt={1}>
            <Text>Nom: {etudiant.nom}</Text>
            <Text>Prénom: {etudiant.prenom}</Text>
            <Text>Email: {etudiant.email}</Text>
            <Text>Spécialité: {etudiant.specialite}</Text>
            <Text>Âge: {etudiant.age}</Text>
          </Box>
        ))
      ) : (
        <Text>Aucun étudiant inscrit pour ce cours.</Text>
      )}
    </Box>
  );
};

export default EtudiantsInscrits;
