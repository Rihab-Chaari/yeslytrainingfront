import React, { useState, useEffect } from 'react';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';
import CourseItem from '../../../src/components/CourseItem'; // Assume you have this component already
import SidebarWithHeader from '../../../src/components/SidebarWithHeader';

const ManageCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Correct token retrieval
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Set up the headers with the token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Use correct string interpolation
          },
        };

        // Fetch courses from the API
        const response = await axios.get('http://localhost:8081/api/cours/withtrainersandstudents', config);
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch courses. Please make sure you are authorized.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token]); // Add token to the dependency array in case it changes

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <SidebarWithHeader>
  
    <Box p={4}>
      <Heading size="lg" mb={4}>Manage Courses</Heading>
      {courses.length === 0 ? (
        <Text>No courses available.</Text>
      ) : (
        courses.map(course => (
          <CourseItem key={course.course.id} course={course.course} students={course.students} />
        ))
      )}
    </Box>
    </SidebarWithHeader>
  );
};

export default ManageCoursesPage;
