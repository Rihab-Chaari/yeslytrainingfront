import React from 'react';
import { Box, Text, Heading, Button, Flex, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { CheckIcon, WarningIcon } from '@chakra-ui/icons';

const formatDate = (dateStr) => {
  if (!dateStr) return 'Invalid date';

  const [day, month, year] = dateStr.split('/');
  const formattedDateStr = `${year}-${month}-${day}`;
  const date = new Date(formattedDateStr);

  if (isNaN(date.getTime())) return 'Invalid date';

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const ItemCourse = ({ course, registeredCourses = [], updateRegisteredCourses }) => {
  const isRegistered = registeredCourses.includes(course.id);

  const handleInscription = async () => {
    if (isRegistered) {
      alert('Vous êtes déjà inscrit dans ce cours.');
      return;
    }

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
      console.log("Données d'inscription :", inscriptionData);

      const response = await axios.post('http://localhost:8081/api/inscriptions/inscri', inscriptionData, config);
      alert(response.data); // Affiche le message du backend

      // Mettre à jour la liste des cours inscrits après l'inscription
      if (updateRegisteredCourses) {
        updateRegisteredCourses(course.id);
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      const errorMessage = error.response && typeof error.response.data === 'string'
        ? error.response.data
        : 'Erreur lors de l\'inscription.';
      alert(errorMessage);
    }
  };

  return (
    <Box p={5} borderWidth="1px" borderRadius="lg" w="100%" bg="white" boxShadow="lg" transition="0.3s" _hover={{ shadow: "xl" }}>
      <Flex direction="column">
        <Heading size="md" color="teal.600">{course.titre || 'No title'}</Heading>
        <Text mt={2} color="gray.600">{course.description || 'No description'}</Text>
        <VStack align="flex-start" mt={3} spacing={1}>
          <Text fontWeight="semibold">Start Date:</Text>
          <Text>{formatDate(course.dateDebut) || 'Invalid date'}</Text>
          <Text fontWeight="semibold">End Date:</Text>
          <Text>{formatDate(course.dateFin) || 'Invalid date'}</Text>
          <Text fontWeight="semibold">Duration:</Text>
          <Text>{course.duree ? `${course.duree} hours` : 'Not specified'}</Text>
          <Text fontWeight="semibold">Montant:</Text>
          <Text>{course.montant ? `${course.montant} DT` : 'Not specified'}</Text>
          <Text fontWeight="semibold">Trainer:</Text>
          <Text>{course.formateur ? `${course.formateur.nom} ${course.formateur.prenom} (${course.formateur.email})` : 'Not assigned'}</Text>
        </VStack>
        <Button
          mt={4}
          colorScheme={isRegistered ? "gray" : "teal"}
          onClick={handleInscription}
          isDisabled={isRegistered}
          leftIcon={isRegistered ? <CheckIcon /> : <WarningIcon />}
        >
          {isRegistered ? 'Already Registered' : 'Register'}
        </Button>
      </Flex>
    </Box>
  );
};

export default ItemCourse;
