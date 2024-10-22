import React, { useEffect, useState } from 'react';
import { 
  Box, Text, Heading, VStack, Flex, Spinner, Alert, AlertIcon, Divider, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon 
} from '@chakra-ui/react';
import axios from 'axios';

// Utility function to format dates
const formatDate = (dateStr) => {
  if (!dateStr) return 'Invalid date';
  
  const [day, month, year] = dateStr.split('/');
  const formattedDateStr = `${year}-${month}-${day}`;
  const date = new Date(formattedDateStr);
  if (isNaN(date.getTime())) return 'Invalid date';

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const CourseItem = ({ course, students }) => {
  const [paiements, setPaiements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const courseIds = JSON.parse(localStorage.getItem('courseIds'));
  console.log(courseIds); 

  useEffect(() => {
    const fetchPaiements = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://localhost:8081/api/paiements/course/${courseIds}`, config);
        setPaiements(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch payment statuses. Please make sure you are authorized.');
        setLoading(false);
      }
      
    };

    fetchPaiements();
  }, [course.id, token]);
  console.log(course.id);

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <Spinner size="lg" />
        <Text mt={2}>Loading payment statuses...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6} boxShadow="lg" bg="white">
      <Heading size="lg" color="teal.500" mb={4}>{course.title}</Heading>
      
      <Text fontSize="md" color="gray.600" mb={4}>{course.description}</Text>
      
      <VStack spacing={4} align="start" mb={4}>
        <Text fontWeight="bold">Start Date: <Text as="span" color="gray.600">{formatDate(course.dateDebut)}</Text></Text>
        <Text fontWeight="bold">End Date: <Text as="span" color="gray.600">{formatDate(course.dateFin)}</Text></Text>
        <Text fontWeight="bold">Duration: <Text as="span" color="gray.600">{course.duree ? `${course.duree} hours` : 'Not specified'}</Text></Text>
        <Text fontWeight="bold">Trainer: <Text as="span" color="gray.600">{course.formateur ? `${course.formateur.nom} ${course.formateur.prenom} (${course.formateur.email})` : 'Not assigned'}</Text></Text>
      </VStack>

      <Divider my={4} borderColor="gray.300" />

      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Heading size="md" color="teal.500">Students & Payment Status</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            {students.length > 0 ? (
              <VStack spacing={4} align="start">
                {students.map((student) => {
                  const paiement = paiements.find(p => p.etudiant.id === student.id);
                  return (
                    <Flex key={student.id} justify="space-between" width="100%">
                      <Text color="gray.600">{student.nom} {student.prenom} ({student.email})</Text>
                      <Text color={paiement ? (paiement.statutPaiement === 'Paid' ? 'green.500' : 'red.500') : 'gray.500'}>
                        {paiement ? paiement.statutPaiement : 'No payment info'}
                      </Text>
                    </Flex>
                  );
                })}
              </VStack>
            ) : (
              <Text color="gray.500">No students enrolled yet.</Text>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default CourseItem;
