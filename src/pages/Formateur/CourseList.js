import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, Text, Heading, VStack, HStack, Divider, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SidebarWithHeader from '../../../src/components/SidebarWithHeader';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  const formateurId = JSON.parse(localStorage.getItem('user')).id; // Récupérer l'ID du formateur connecté

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/cours/formateur/${formateurId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request header
          }
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error.response);
        toast({
          title: 'Failed to load courses.',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchCourses();
  }, [formateurId, toast, token]);

  const handleEdit = (id) => {
    navigate(`/edit-course/${id}`); // Redirect to the edit page for the selected course
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/cours/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request header
        }
      });
      setCourses(courses.filter(course => course.id !== id));
      toast({
        title: 'Course deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting course:', error.response);
      toast({
        title: 'Failed to delete course.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <SidebarWithHeader>
      <Box p={8} bg="gray.50" minH="100vh">
        <Heading mb={6} color="#DE3163" textAlign="center">Course List</Heading>
        <Stack spacing={6}>
          {courses.length > 0 ? (
            courses.map(course => (
              <Box
                key={course.id}
                borderWidth="1px"
                borderRadius="lg"
                p={6}
                bg='gray.100'
                boxShadow="lg"
                transition="transform 0.2s ease-in-out"
                _hover={{ transform: 'scale(1.02)' }}
              >
                <VStack align="start" spacing={4}>
                  <Heading size="md" color="#DE3163" fontWeight="bold">{course.titre}</Heading>
                  <Text fontWeight="bold">Description: <Text mt={2} fontSize="md" color="gray.600">{course.description}</Text></Text>
                  <Text fontWeight="bold">Start Date: <Text as="span" color="gray.600">{course.dateDebut}</Text></Text>
                  <Text fontWeight="bold">End Date: <Text as="span" color="gray.600">{course.dateFin}</Text></Text>
                  <Text fontWeight="bold">Duration: <Text as="span" color="gray.600">{course.duree} hours</Text></Text>
                  <Text fontWeight="bold">Montant: <Text as="span" color="gray.600">{course.montant} DT</Text></Text>
                  <Divider my={4} />
                  <HStack spacing={6}>
                    <Button
                      onClick={() => handleEdit(course.id)}
                      colorScheme="#DE3163"
                      variant="outline"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(course.id)}
                      colorScheme="red"
                      variant="solid"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            ))
          ) : (
            <Text fontStyle="italic" color="gray.500">No courses available.</Text>
          )}
        </Stack>
      </Box>
    </SidebarWithHeader>
  );
};

export default CourseList;
