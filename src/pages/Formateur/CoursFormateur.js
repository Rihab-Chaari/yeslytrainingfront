import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Text,
  Heading,
  VStack,
  SimpleGrid,
  useColorModeValue,
  Spinner,
  Alert,
  AlertIcon,
  Button,
} from '@chakra-ui/react';
import EtudiantsInscrits from './EtudiantsInscrits'; // Assurez-vous que ce chemin est correct
import SidebarWithHeader from '../../components/SidebarWithHeader';

const CoursFormateur = () => {
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEtudiants, setShowEtudiants] = useState({}); // État pour afficher/masquer les étudiants
  const formateurId = JSON.parse(localStorage.getItem('user')).id; // Récupération dynamique de l'ID

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
        setError('Erreur lors de la récupération des cours. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };

    fetchCours();
  }, [formateurId]);

  // Filtrer les cours pour exclure ceux dont la date de fin est passée
  const today = new Date(); // Date actuelle

  const filteredCours = cours.filter((cour) => {
    const dateFin = new Date(cour.dateFin); // Convertir la date de fin en objet Date
    return dateFin >= today; // Retourner seulement les cours qui n'ont pas encore expiré
  });

  // Utilisation des valeurs de couleur en fonction du mode
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const headingColor = '#383587'; // Couleur de l'en-tête
  const buttonColor = '#d32c81'; // Couleur du bouton pour afficher/masquer

  return (
    <SidebarWithHeader>
      <Box p={5}>
        <Heading size="lg" mb={4} textAlign="center" color={headingColor}>
          Liste des Cours
        </Heading>
        
        {loading && (
          <Box textAlign="center" mt={5}>
            <Spinner size="lg" color="teal.500" />
            <Text mt={2}>Chargement des cours...</Text>
          </Box>
        )}

        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}

        {filteredCours.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {filteredCours.map((cour) => (
              <Box
                key={cour.id}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                bg={cardBgColor} // Utilisation de la variable ici
                boxShadow="md"
                transition="0.2s"
                _hover={{ boxShadow: 'lg' }}
                aria-labelledby={`course-title-${cour.id}`} // Attribut ARIA pour l'accessibilité
              >
                <VStack align="start" spacing={2}>
                  <Heading size="md" id={`course-title-${cour.id}`}>{cour.titre}</Heading>
                  <Text fontSize="sm" color="gray.600">{cour.description}</Text>
                  <Text><strong>Durée:</strong> {cour.duree} heures</Text>
                  <Text><strong>Date de début:</strong> {cour.dateDebut}</Text>
                  <Text><strong>Date de fin:</strong> {cour.dateFin}</Text>
                  
                  {/* Bouton pour afficher/masquer la liste des étudiants */}
                  <Button
                    mt={2}
                    size="sm"
                    onClick={() => setShowEtudiants((prev) => ({
                      ...prev,
                      [cour.id]: !prev[cour.id], // Toggle the visibility for the specific course
                    }))}
                    colorScheme={showEtudiants[cour.id] ? "red" : "blue"}
                    bg={buttonColor} // Couleur personnalisée
                    color="white" // Couleur du texte
                    _hover={{ bg: '#c82a76' }} // Couleur de survol
                  >
                    {showEtudiants[cour.id] ? "Masquer les étudiants" : "Afficher les étudiants"}
                  </Button>
                  
                  {/* Liste des étudiants inscrits, cachée par défaut */}
                  {showEtudiants[cour.id] && <EtudiantsInscrits coursId={cour.id} />}
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          !loading && ( // Afficher le message uniquement si ce n'est pas en cours de chargement
            <Text textAlign="center" color="gray.500" mt={5}>Aucun cours actif trouvé pour ce formateur.</Text>
          )
        )}
      </Box>
    </SidebarWithHeader>
  );
};

export default CoursFormateur;
