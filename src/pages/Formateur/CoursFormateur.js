import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, Heading } from '@chakra-ui/react';
import EtudiantsInscrits from './EtudiantsInscrits'; // Assurez-vous que ce chemin est correct
import SidebarWithHeader from '../../components/SidebarWithHeader';

const CoursFormateur = () => {
  const [cours, setCours] = useState([]);
  const formateurId = 2; // Remplacez ceci par l'ID du formateur en cours (peut venir du localStorage ou d'une autre source)

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
        console.error('Erreur lors de la récupération des cours :', error);
      }
    };

    fetchCours();
  }, [formateurId]);

  return (
    <SidebarWithHeader>
    <Box>
      <Heading size="md">Liste des cours</Heading>
      {cours.length > 0 ? (
        cours.map((cour) => (
          <Box key={cour.id} p={4} borderWidth="1px" borderRadius="lg" w="100%" bg="white" mt={2}>
            <Text>Titre: {cour.titre}</Text>
            <Text>Description: {cour.description}</Text>
            <Text>Durée: {cour.duree} heures</Text>
            <Text>Date de début: {cour.dateDebut}</Text>
            <Text>Date de fin: {cour.dateFin}</Text>

            <EtudiantsInscrits coursId={cour.id} />
          </Box>
        ))
      ) : (
        <Text>Aucun cours trouvé pour ce formateur.</Text>
      )}
    </Box>
    </SidebarWithHeader>
  );
};

export default CoursFormateur;
