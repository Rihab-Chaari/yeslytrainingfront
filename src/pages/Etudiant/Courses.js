import React, { useState, useEffect } from 'react';
import { Box, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import axios from 'axios'; 
import SidebarWithHeader from '../../components/SidebarWithHeader';
import ItemCourse from '../Etudiant/ItemCourse'; 

const Courses = () => {
  const [courses, setCourses] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registeredCourses, setRegisteredCourses] = useState([]); 

  // Fetching the courses and registered courses when the component loads
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
        console.log(response.data); 

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

    const fetchRegisteredCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user')); // Récupère l'utilisateur connecté depuis localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetches the list of courses the user has already registered for
        const response = await axios.get(`http://localhost:8081/api/inscriptions/user/${user.id}`, config);
        const registeredCourseIds = response.data.map(inscription => inscription.cours.id); // Extract course IDs
        setRegisteredCourses(registeredCourseIds);
      } catch (error) {
        console.error('Erreur lors de la récupération des cours inscrits:', error);
      }
    };

    fetchCourses();  // Fetch all courses
    fetchRegisteredCourses(); // Fetch registered courses
  }, []); 

  // Filtrer les cours pour exclure ceux dont la date de fin est passée
  const today = new Date(); // Date actuelle

  const filteredCourses = courses.filter((course) => {
    const dateFin = new Date(course.dateFin); // Convertir la date de fin en objet Date
    return dateFin >= today; // Retourner seulement les cours qui n'ont pas encore expiré
  });

  // Updates the registered courses state after a new course registration
  const updateRegisteredCourses = (courseId) => {
    setRegisteredCourses((prev) => [...prev, courseId]);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <SidebarWithHeader>
      <Box p={4}>
        <Heading mb={6}>Available Courses</Heading>
        <VStack spacing={4}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <ItemCourse
                key={course.id}
                course={course}
                registeredCourses={registeredCourses} // Pass the registered courses to check if user is already registered
                updateRegisteredCourses={updateRegisteredCourses} // Function to update after a successful registration
              />
            ))
          ) : (
            <Text>No active courses available at the moment.</Text>
          )}
        </VStack>
      </Box>
    </SidebarWithHeader>
  );
};

export default Courses;
