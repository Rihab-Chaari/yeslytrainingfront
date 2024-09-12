// src/pages/Responsable/Courses.js
import React, { useEffect, useState } from 'react';
import CourseService from '../../services/CourseService';
import { Box, Heading, Text, Button, Stack } from '@chakra-ui/react';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await CourseService.getCourses();
      console.log('Courses:', response.data); // Vérifiez la réponse ici
      setCourses(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des cours:', error);
    }
  };

  return (
    <Box p={8}>
      <Heading>Cours disponibles</Heading>
      <Stack spacing={4} mt={6}>
        {courses.map(course => (
          <Box key={course.id} p={5} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{course.titre}</Heading>
            <Text mt={4}>{course.description}</Text>
          </Box>
        ))}
      </Stack>
      <Button onClick={fetchCourses} mt={6}>Actualiser</Button>
    </Box>
  );
};

export default Courses;
