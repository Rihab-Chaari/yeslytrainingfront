import React, { useState, useEffect } from 'react';
import { Box, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import axios from 'axios'; // Assurez-vous que ce chemin est correct
import SidebarWithHeader from '../../components/SidebarWithHeader';
import ItemCourse from '../Etudiant/ItemCourse';

const Courses = () => {
  const [courses, setCourses] = useState([]); // Assurez-vous que courses est un tableau vide par défaut
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://localhost:8081/api/cours', config);
        console.log(response.data); // Vérifiez les données ici

        // Assurez-vous que la réponse est un tableau
        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          setError('Unexpected data format.');
        }
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch courses. Please make sure you are authorized.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Dépendances vides pour n'exécuter l'effet qu'une seule fois

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <SidebarWithHeader>
      <Box p={4}>
        <Heading size="lg" mb={4}>Available Courses</Heading>
        {courses.length === 0 ? (
          <Text>No courses available.</Text>
        ) : (
          <VStack spacing={4}>
            {courses.map(course => (
              <ItemCourse key={course.id} course={course} />
            ))}
          </VStack>
        )}
      </Box>
    </SidebarWithHeader>
  );
};

export default Courses;
