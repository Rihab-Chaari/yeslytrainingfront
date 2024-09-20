import React from 'react';
import { Box, Text, Heading, VStack } from '@chakra-ui/react';

// Utility function to format dates
const formatDate = (dateStr) => {
  if (!dateStr) return 'Invalid date';
  
  // Convert "14/09/2024" to "2024-09-14" for proper parsing
  const [day, month, year] = dateStr.split('/');
  const formattedDateStr = `${year}-${month}-${day}`;
  const date = new Date(formattedDateStr);

  if (isNaN(date.getTime())) return 'Invalid date';

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const CourseItem = ({ course, students }) => {
  if (!course) {
    return <Text>Course data is not available.</Text>;
  }

  const { titre, description, formateur, dateDebut, dateFin, duree } = course;

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" w="100%" bg="white" boxShadow="md">
      <Heading size="md">{titre}</Heading>
      <Text mt={2}>{description}</Text>
      <Text mt={2}>Start Date: {formatDate(dateDebut)}</Text>
      <Text mt={2}>End Date: {formatDate(dateFin)}</Text>
      <Text mt={2}>Duration: {duree ? `${duree} hours` : 'Not specified'}</Text>
      <Text mt={2} fontWeight="bold">
        Trainer: {formateur ? `${formateur.nom} ${formateur.prenom} (${formateur.email})` : 'Not assigned'}
      </Text>

      <VStack mt={4} align="start">
        <Heading size="sm">Registered Students:</Heading>
        {students && students.length === 0 ? (
          <Text>No students registered.</Text>
        ) : (
          students.map(student => (
            <Text key={student.id}>- {student.nom} {student.prenom} ({student.email})</Text>
          ))
        )}
      </VStack>
    </Box>
  );
};

export default CourseItem;
