import React from 'react';
import { Box, Text, Heading, Button } from '@chakra-ui/react';
import axios from 'axios';

const formatDate = (dateStr) => {
  if (!dateStr) return 'Invalid date';

  const [day, month, year] = dateStr.split('/');
  const formattedDateStr = `${year}-${month}-${day}`;
  const date = new Date(formattedDateStr);

  if (isNaN(date.getTime())) return 'Invalid date';

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const ItemCourse = ({ course, registeredCourses = [] }) => {
  const isRegistered = registeredCourses.includes(course.id);

  const handleInscription = async () => {
    try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.id) {
            alert('User ID is missing!');
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const inscriptionData = {
            etudiantId: user.id,
            coursId: course.id,
        };

        await axios.post('http://localhost:8081/api/inscriptions/inscri', inscriptionData, config);
        alert('Inscription réussie !');
        // Optionnel : Vous pouvez mettre à jour l'état des cours inscrits ici

    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);

        // Vérifiez si l'erreur a une réponse et que le message est bien un texte
        const errorMessage = error.response && typeof error.response.data === 'string'
            ? error.response.data
            : 'vous êtes déjà inscrit dans ce cours';
        alert(errorMessage);
    }
};

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" w="100%" bg="white" boxShadow="md">
      <Heading size="md">{course.titre || 'No title'}</Heading>
      <Text mt={2}>{course.description || 'No description'}</Text>
      <Text mt={2}>Start Date: {formatDate(course.dateDebut) || 'Invalid date'}</Text>
      <Text mt={2}>End Date: {formatDate(course.dateFin) || 'Invalid date'}</Text>
      <Text mt={2}>Duration: {course.duree ? `${course.duree} hours` : 'Not specified'}</Text>
      <Text mt={2} fontWeight="bold">
        Trainer: {course.formateur ? `${course.formateur.nom} ${course.formateur.prenom} (${course.formateur.email})` : 'Not assigned'}
      </Text>
      <Button mt={4} colorScheme="teal" onClick={handleInscription} isDisabled={isRegistered}>
        {isRegistered ? 'Registered' : 'Register'}
      </Button>
    </Box>
  );
};

export default ItemCourse;
